CREATE TABLE patients (
    id         SERIAL       PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    birth_date DATE         NOT NULL,
    phone      TEXT         NOT NULL
);

CREATE TABLE doctors (
    id         SERIAL       PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL
);

CREATE TABLE medical_records (
    id              SERIAL      PRIMARY KEY,
    patient_id      INT         NOT NULL REFERENCES patients(id),
    doctor_id       INT         NOT NULL REFERENCES doctors(id),
    visited_at      TIMESTAMPTZ NOT NULL,
    chief_complaint TEXT        NOT NULL,
    diagnosis_code  VARCHAR(10),
    treatment_plan  TEXT
);
