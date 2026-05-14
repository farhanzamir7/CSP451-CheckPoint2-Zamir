const express = require("express");

const router = express.Router();

const users = [
  {
    id: 1,
    name: "Demo Student",
    email: "student@example.com",
  },
];

function validateUserInput(body) {
  const errors = [];

  if (!body.name || body.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  if (!body.email || !body.email.includes("@")) {
    errors.push("A valid email address is required.");
  }

  return errors;
}

router.get("/", (req, res) => {
  res.json({
    users,
    count: users.length,
  });
});

router.post("/", (req, res) => {
  const errors = validateUserInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name.trim(),
    email: req.body.email.trim().toLowerCase(),
  };

  users.push(newUser);

  return res.status(201).json({
    success: true,
    user: newUser,
  });
});

module.exports = {
  router,
  validateUserInput,
};
