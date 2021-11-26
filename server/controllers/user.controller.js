const User = require("../models/user.model");

const getAllUsersEmail = async (req, res) => {
  try {
    const users = await User.find({}).select("email -_id").lean().exec();

    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = { getAllUsersEmail };
