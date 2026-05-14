const express = require("express");

const router = express.Router();

function buildHealthResponse() {
  return {
    status: "ok",
    service: "csp451-web-starter",
    timestamp: new Date().toISOString(),
  };
}

router.get("/", (req, res) => {
  res.json(buildHealthResponse());
});

module.exports = {
  router,
  buildHealthResponse,
};
