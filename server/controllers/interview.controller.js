const User = require("../models/user.model");
const Interview = require("../models/interview.model");
const isOverlaps = require("../config/isOverlaps");

const addInterview = async (req, res) => {
  try {
    let { startTime, endTime, usersInvited } = req.body;

    if (!startTime) {
      return res.status(400).json({
        message: "startTime is not valid",
      });
    }
    if (!endTime) {
      return res.status(400).json({
        message: "endTime is not valid",
      });
    }
    if (!usersInvited) {
      return res.status(400).json({
        message: "usersInvited is not valid",
      });
    }

    // validations
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    if (endTime < startTime) {
      return res.status(400).json({
        message: "endTime cannot be before startTime",
      });
    }

    if (startTime < Date.now()) {
      return res.status(400).json({
        message: "startTime cannot be before current time",
      });
    }

    if (usersInvited.length <= 1) {
      return res.status(400).json({
        message: "Total users invited should be atleast 2",
      });
    }

    const users = await User.find({ email: { $in: usersInvited } })
      .populate({
        path: "interviewsScheduled",
        model: "Interview",
        select: "startTime endTime",
      })
      .lean()
      .exec();
    
    // Compare time with all previous meetings of each user.
    for (let user of users) {
      user?.interviewsScheduled.forEach((interview) => {
        if (
          isOverlaps(interview.startTime, interview.endTime, startTime, endTime)
        ) {
          return res.status(400).json({
            message: `User, ${user.email} is already having an interview scheduled at this time. Please select another time.`,
          });
        }
      });
    }

    const userIds = [];
    for (let user of users) {
        userIds.push(user._id);
    }

    // add new interview
    let interview = new Interview({
        startTime,
        endTime,
        usersInvited: userIds,
    });

    interview = await interview.save();
    
    // add this interview to all users
    for (let user of users) {
        await User.updateOne(
            { _id: user._id },
            { $push: { interviewsScheduled: interview._id } }
        );
    }

    return res.status(201).json({
        message: "Interview added!",
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUpcomingInterviews = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const getInterviewDetials = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const updateInterviewDetails = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = { addInterview, getUpcomingInterviews, getInterviewDetials, updateInterviewDetails };