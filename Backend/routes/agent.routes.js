// routes/agent.routes.js
const express = require("express");
const router = express.Router();
const { runAgent } = require("../langgraph/agent");

router.post("/query", async (req, res) => {
  try {
    const { query, patientId } = req.body;
    const reply = await runAgent(query, patientId);
    res.json({ reply });
  } catch (err) {
    console.error("Agent error:", err);
    res.status(500).json({ error: "Agent failed", details: err.message });
  }
});

module.exports = router;
