from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import verify_token
from app.database import Base, engine
import app.models
from app.routers import patients, doctors, medical_records

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Hospital Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router, dependencies=[Depends(verify_token)])
app.include_router(doctors.router, dependencies=[Depends(verify_token)])
app.include_router(medical_records.router, dependencies=[Depends(verify_token)])


@app.get("/")
def root():
    return {"message": "Hospital Management System API"}
