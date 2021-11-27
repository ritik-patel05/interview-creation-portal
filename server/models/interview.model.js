const mongoose = require("mongoose");

const { Schema } = mongoose;

const interviewSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: [true, "Start time of interview is required."],
    },
    endTime: {
      type: Date,
      required: [true, "End time of interview is required."],
    },
    usersInvited: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    resume: {
      type: String,
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
