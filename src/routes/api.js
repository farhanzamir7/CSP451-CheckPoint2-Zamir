const express = require("express");
const { router: healthRouter } = require("./api/health");

const router = express.Router();

router.use("/health", healthRouter);

module.exports = {
  router,
};
