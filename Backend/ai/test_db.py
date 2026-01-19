from fetch_sessions import fetch_sessions

patient_id = "7fb3e6e7-e75a-4a81-90e5-5e19a4372020"  # replace with a real one from the table
sessions = fetch_sessions(patient_id, limit=5)

print("Fetched Sessions:")
for s in sessions:
    print(s)
