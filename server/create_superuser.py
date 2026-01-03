import getpass
from sqlalchemy.orm import Session

from db import SessionLocal, Base, engine
from models import User
from auth import hash_password

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def main():
    db: Session = SessionLocal()
    try:
        email = input("Superuser email: ").strip().lower()
        password = getpass.getpass("Superuser password: ")

        existing = db.query(User).filter(User.email == email).first()
        if existing:
            existing.is_superuser = True
            existing.password_hash = hash_password(password)
            db.commit()
            print("✅ Updated existing user to superuser.")
            return

        user = User(email=email, password_hash=hash_password(password), is_superuser=True)
        db.add(user)
        db.commit()
        print("✅ Superuser created.")
    finally:
        db.close()

if __name__ == "__main__":
    main()
