import os
import psycopg2
from urllib.parse import urlparse
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
url = urlparse(DATABASE_URL)

def fetch_sessions(patient_id, limit=5):
    conn = psycopg2.connect(
        dbname=url.path[1:],       
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    cur = conn.cursor()
    cur.execute("""
        SELECT "id", "startTime", "endTime", "joint", "repCount", "repDurationMs", 
            "rom", "qualityScore", "stability"
        FROM "SensorSession"
        WHERE "patientId" = %s
        ORDER BY "startTime" DESC
        LIMIT %s
    """, (patient_id, limit))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    sessions = []
    for row in rows:
        sessions.append({
            "id": row[0],
            "start_time": row[1],
            "end_time": row[2],
            "joint": row[3],
            "rep_count": row[4],
            "rep_duration": row[5],
            "rom": row[6],
            "quality_score": row[7],
            "stability": row[8],
        })
    return sessions
