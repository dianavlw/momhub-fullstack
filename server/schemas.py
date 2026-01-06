from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class PostCreate(BaseModel):
    text: str

class PostOut(BaseModel):
    id: int
    text: str

    class Config:
        from_attributes = True
