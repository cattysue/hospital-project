from sqlalchemy import Column, Integer, String, Date
from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    birth_date = Column(Date, nullable=False)
    phone = Column(String, nullable=False)
