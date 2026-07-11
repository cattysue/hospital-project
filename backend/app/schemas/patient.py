from pydantic import BaseModel
from datetime import date
from typing import Optional


class PatientCreate(BaseModel):
    name: str
    birth_date: date
    phone: str


class PatientUpdate(BaseModel):
    name: Optional[str] = None
    birth_date: Optional[date] = None
    phone: Optional[str] = None


class PatientResponse(BaseModel):
    id: int
    name: str
    birth_date: date
    phone: str

    class Config:
        from_attributes = True
