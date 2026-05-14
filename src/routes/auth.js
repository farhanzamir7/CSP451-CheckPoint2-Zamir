const express = require("express");
const { authenticateUser } = require("../services/authService");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const result = authenticateUser(username, password);

  if (!result.success) {
    return res.status(result.status).json({
      success: false,
      errors: result.errors,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    user: result.user,
  });
});

module.exports = {
  router,
};