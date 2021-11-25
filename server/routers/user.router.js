const express = require("express");
const { getAllUsersEmail } = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(getAllUsersEmail);

module.exports = router;
