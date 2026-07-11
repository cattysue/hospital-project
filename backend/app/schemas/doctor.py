from pydantic import BaseModel
from typing import Optional


class DoctorCreate(BaseModel):
    name: str
    department: str


class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None


class DoctorResponse(BaseModel):
    id: int
    name: str
    department: str

    class Config:
        from_attributes = True
