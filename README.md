# Hospital Management System

병원 진료 관리 시스템 — 환자 등록, 의사 진료, 진료기록 관리

## Stack

| 역할 | 기술 |
|------|------|
| Database | PostgreSQL |
| Backend | FastAPI |
| Frontend | Next.js |
| Mobile | Flutter |
| Deploy | Railway |

## 구조

```
hospital-project/
├── backend/      # FastAPI
├── frontend/     # Next.js  (npx create-next-app 으로 초기화)
├── mobile/       # Flutter  (flutter create 로 초기화)
├── database/
│   └── init.sql  # 테이블 DDL
└── .gitignore
```

## 로컬 실행

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env   # DATABASE_URL 수정
uvicorn app.main:app --reload
```

API 문서: http://localhost:8000/docs

## ERD

- `patients` — 환자 기본 정보
- `doctors` — 의사 정보
- `medical_records` — 진료기록 (patients, doctors 참조)
