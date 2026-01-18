from physio_agent import app

# Ask a test question
result = app.invoke({
    "question": "How did I do in my last 3 sessions?"
})

print("Agent Answer:")
print(result["answer"])
