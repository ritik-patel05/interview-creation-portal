const express = require("express");
const {
  addInterview,
  getUpcomingInterviews,
  getInterviewDetials,
  updateInterviewDetails,
} = require("../controllers/quiz.controller");

const router = express.Router();

router.route("/").post(addInterview);
router.route("/upcoming").get(getUpcomingInterviews);
router.route("/:interviewId").get(getInterviewDetials);
router.route("/:interviewId").put(updateInterviewDetails);

module.exports = router;