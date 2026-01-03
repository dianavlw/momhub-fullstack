import os
from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from db import get_db
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET = os.getenv("JWT_SECRET", "dev_secret_change_me")
ALGO = os.getenv("JWT_ALGORITHM", "HS256")
EXPIRES_MIN = int(os.getenv("JWT_EXPIRES_MINUTES", "60"))


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_access_token(user_id: int) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": str(user_id),
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=EXPIRES_MIN)).timestamp()),
    }
    return jwt.encode(payload, SECRET, algorithm=ALGO)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGO])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.get(User, int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

def hash_password(password: str) -> str:
    if len(password.encode("utf-8")) > 72:
        raise ValueError("Password must be 72 bytes or less for bcrypt.")
    return pwd_context.hash(password)
