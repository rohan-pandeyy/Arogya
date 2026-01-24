from langgraph.graph import StateGraph
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from typing import TypedDict, List
from fetch_sessions import fetch_sessions

class AgentState(TypedDict):
    question: str
    answer: str
    sessions: List[dict]
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0)

system_prompt = """
You are a physiotherapist AI agent.
Use the patient's session data to give supportive feedback.
If asked for progress, summarize improvements in ROM, stability, and rep counts.
"""
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{context}\n\nNow answer: {question}")
])

def get_sessions(state: AgentState):
    patient_id = "7fb3e6e7-e75a-4a81-90e5-5e19a4372020"
    sessions = fetch_sessions(patient_id)
    return {"sessions": sessions}

def generate_answer(state: AgentState):
    context = "\n".join([
        f"Session {s['id']} | Reps: {s['rep_count']} | ROM: {s['rom']} | Stability: {s['stability']}"
        for s in state["sessions"]
    ])
    chain = prompt | llm
    answer = chain.invoke({"context": context, "question": state["question"]}).content
    return {"answer": answer}

workflow = StateGraph(AgentState)
workflow.add_node("get_sessions", get_sessions)
workflow.add_node("generate_answer", generate_answer)

workflow.set_entry_point("get_sessions")
workflow.add_edge("get_sessions", "generate_answer")

app = workflow.compile()
