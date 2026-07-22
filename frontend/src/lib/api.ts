const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export type Patient = {
  id: number
  name: string
  birth_date: string
  phone: string
}

export type Doctor = {
  id: number
  name: string
  department: string
}

export type MedicalRecord = {
  id: number
  patient_id: number
  doctor_id: number
  visited_at: string
  chief_complaint: string
  diagnosis_code: string | null
  treatment_plan: string | null
  patient: Patient
  doctor: Doctor
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.detail || `API error ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const getPatients = () => apiFetch<Patient[]>('/patients/')
export const getPatient = (id: number) => apiFetch<Patient>(`/patients/${id}`)
export const createPatient = (data: Omit<Patient, 'id'>) =>
  apiFetch<Patient>('/patients/', { method: 'POST', body: JSON.stringify(data) })
export const deletePatient = (id: number) =>
  apiFetch<void>(`/patients/${id}`, { method: 'DELETE' })

export const getDoctors = () => apiFetch<Doctor[]>('/doctors/')
export const getDoctor = (id: number) => apiFetch<Doctor>(`/doctors/${id}`)
export const createDoctor = (data: Omit<Doctor, 'id'>) =>
  apiFetch<Doctor>('/doctors/', { method: 'POST', body: JSON.stringify(data) })
export const deleteDoctor = (id: number) =>
  apiFetch<void>(`/doctors/${id}`, { method: 'DELETE' })

export const getMedicalRecords = (patientId?: number) =>
  apiFetch<MedicalRecord[]>(`/medical-records/${patientId ? `?patient_id=${patientId}` : ''}`)
export const createMedicalRecord = (data: {
  patient_id: number
  doctor_id: number
  visited_at: string
  chief_complaint: string
  diagnosis_code?: string
  treatment_plan?: string
}) => apiFetch<MedicalRecord>('/medical-records/', { method: 'POST', body: JSON.stringify(data) })
export const deleteMedicalRecord = (id: number) =>
  apiFetch<void>(`/medical-records/${id}`, { method: 'DELETE' })
