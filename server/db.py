# server/db.py

from pathlib import Path
import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1) Load server/.env explicitly
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

# 2) Read DATABASE_URL AFTER loading .env
DATABASE_URL = os.getenv("DATABASE_URL")

# 3) Debug prints (temporary)
print("✅ Loaded .env from:", env_path)
print("✅ DATABASE_URL =", DATABASE_URL)

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing in server/.env")

# 4) Create engine + session factory + Base
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
