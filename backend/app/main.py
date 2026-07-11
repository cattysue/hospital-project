from fastapi import FastAPI

app = FastAPI(title="Hospital Management System")


@app.get("/")
def root():
    return {"message": "Hospital Management System API"}
