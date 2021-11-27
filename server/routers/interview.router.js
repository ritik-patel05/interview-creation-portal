const express = require("express");
const {
  addInterview,
  getUpcomingInterviews,
  getInterviewById,
  updateInterviewDetails,
} = require("../controllers/interview.controller");
const { upload } = require("../middlewares/resumeUpload");

const router = express.Router();

router.post("/", upload.single("resume"), addInterview);
router.route("/upcoming").get(getUpcomingInterviews);
router.route("/:interviewId").get(getInterviewById);
router.route("/:interviewId").put(updateInterviewDetails);

module.exports = router;
