from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.patient import PatientResponse
from app.schemas.doctor import DoctorResponse


class MedicalRecordCreate(BaseModel):
    patient_id: int
    doctor_id: int
    visited_at: datetime
    chief_complaint: str
    diagnosis_code: Optional[str] = None
    treatment_plan: Optional[str] = None


class MedicalRecordUpdate(BaseModel):
    visited_at: Optional[datetime] = None
    chief_complaint: Optional[str] = None
    diagnosis_code: Optional[str] = None
    treatment_plan: Optional[str] = None


class MedicalRecordResponse(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    visited_at: datetime
    chief_complaint: str
    diagnosis_code: Optional[str]
    treatment_plan: Optional[str]
    patient: PatientResponse
    doctor: DoctorResponse

    class Config:
        from_attributes = True
