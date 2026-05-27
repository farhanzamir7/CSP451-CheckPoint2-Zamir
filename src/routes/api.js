const express = require("express");
const { router: healthRouter } = require("./api/health");
const { router: usersRouter } = require("./api/users");

const router = express.Router();

router.use("/health", healthRouter);
router.use("/users", usersRouter);

module.exports = {
  router,
};
