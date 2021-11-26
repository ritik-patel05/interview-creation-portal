const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Interview = require("../models/interview.model");
const isOverlaps = require("../config/isOverlaps");

const addInterview = asyncHandler(async (req, res) => {
  let { startTime, endTime, usersInvited } = req.body;

  console.log(req.body);
  if (!startTime) {
    res.status(400);
    throw new Error("startTime is not valid");
  }
  if (!endTime) {
    res.status(400);
    throw new Error("endTime is not valid");
  }
  if (!usersInvited) {
    res.status(400);
    throw new Error("usersInvited is not valid");
  }

  // validations
  startTime = new Date(startTime);
  endTime = new Date(endTime);

  if (endTime < startTime) {
    res.status(400);
    throw new Error("endTime cannot be before startTime");
  }

  if (startTime < Date.now()) {
    res.status(400);
    throw new Error("startTime cannot be before current time");
  }

  if (usersInvited.length <= 1) {
    res.status(400);
    throw new Error("Total users invited should be atleast ");
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
        res.status(400);
        throw new Error(
          `User, ${user.email} is already having an interview scheduled at this time. Please select another time.`
        );
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

  res.status(201).json({
    message: "Interview added!",
  });
});

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

module.exports = {
  addInterview,
  getUpcomingInterviews,
  getInterviewDetials,
  updateInterviewDetails,
};
