from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    visited_at = Column(DateTime(timezone=True), nullable=False)
    chief_complaint = Column(Text, nullable=False)
    diagnosis_code = Column(String(10))
    treatment_plan = Column(Text)

    patient = relationship("Patient")
    doctor = relationship("Doctor")
