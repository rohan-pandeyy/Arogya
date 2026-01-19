// langgraph/agent.js
require("dotenv").config();
const { Client } = require("pg");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

// ----------------------
// PostgreSQL Client
// ----------------------
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

// ----------------------
// Gemini AI
// ----------------------
const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0,
});

// ----------------------
// Prompt template
// ----------------------
const system_prompt = `
You are a physiotherapist AI agent.
Your role is to monitor knee joint exercise progress using session data.
Analyze trends, rep counts, ROM, and stability and tell the user about it in easier manner.
Answer the query like in this format not more bigger than this "input":What was my progress in session 1?", "output": "In session 1, you completed 15 reps with an average ROM of 95°, stability score of 0.81, and quality score of 0.75. Your overall progress score was 9.12 (Excellent). Keep it up!"
Use a supportive and clear tone.
`;

const prompt = ChatPromptTemplate.fromMessages([
  ["system", system_prompt],
  ["human", "{question}"],
]);

// ----------------------
// Fetch last N sessions for a patient
// ----------------------
async function fetchSessions(patientId, limit = 5) {
  const query = `
    SELECT "id", "startTime", "endTime", joint, "repCount", "repDurationMs", 
           "rom", "qualityScore", "stability"
    FROM "SensorSession"
    WHERE "patientId" = $1
    ORDER BY "startTime" DESC
    LIMIT $2
  `;
  const res = await client.query(query, [patientId, limit]);

  return res.rows.map(row => ({
    id: row.id,
    start_time: row.startTime,
    end_time: row.endTime,
    joint: row.joint,
    rep_count: row.repCount,
    rep_duration: row.repDurationMs,
    rom: row.rom,
    quality_score: row.qualityScore,
    stability: row.stability,
  }));
}

// ----------------------
// Main agent function
// ----------------------
async function runAgent(question, patientId = "7fb3e6e7-e75a-4a81-90e5-5e19a4372020") {
  const sessions = await fetchSessions(patientId);

  // Make human-readable context
  const context = sessions.map(s => 
    `Session ${s.id} (${s.start_time.toLocaleString()} to ${s.end_time.toLocaleString()}):
    - Joint exercised: ${s.joint}
    - Reps performed: ${s.rep_count}
    - Duration: ${s.rep_duration} ms
    - Range of motion: ${s.rom}°
    - Quality score: ${s.quality_score}
    - Stability: ${s.stability}`
  ).join("\n\n") || "No session data available.";

  // Combine context + question
  const fullQuery = `
Patient Exercise History:
${context}

Question: ${question}

`;

  const chain = prompt.pipe(llm);
  const response = await chain.invoke({ question: fullQuery });

  return response.content;
}

module.exports = { runAgent };
