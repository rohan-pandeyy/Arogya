from physio_agent import app

result = app.invoke({
    "question": "hello"
})

print("Agent Answer:")
print(result["answer"])
