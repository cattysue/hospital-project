import os
import secrets

from dotenv import load_dotenv
from fastapi import Header, HTTPException, status

load_dotenv()
API_TOKEN = os.getenv("API_TOKEN")


def verify_token(authorization: str | None = Header(default=None)) -> None:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="인증 토큰이 필요합니다")
    token = authorization.removeprefix("Bearer ")
    if not API_TOKEN or not secrets.compare_digest(token, API_TOKEN):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="유효하지 않은 토큰입니다")
