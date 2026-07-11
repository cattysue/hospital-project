'use client'

import { useState } from 'react'
import { createMedicalRecord, type Patient, type Doctor } from '@/lib/api'

export default function MedicalRecordForm({
  patients,
  doctors,
  onSuccess,
}: {
  patients: Patient[]
  doctors: Doctor[]
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    patient_id: '',
    doctor_id: '',
    visited_at: '',
    chief_complaint: '',
    diagnosis_code: '',
    treatment_plan: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createMedicalRecord({
        patient_id: Number(form.patient_id),
        doctor_id: Number(form.doctor_id),
        visited_at: new Date(form.visited_at).toISOString(),
        chief_complaint: form.chief_complaint,
        diagnosis_code: form.diagnosis_code || undefined,
        treatment_plan: form.treatment_plan || undefined,
      })
      setForm({ patient_id: '', doctor_id: '', visited_at: '', chief_complaint: '', diagnosis_code: '', treatment_plan: '' })
      setOpen(false)
      onSuccess()
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
        + 새 진료기록 등록
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
      <h2 className="font-semibold text-gray-800">새 진료기록 등록</h2>
      <select
        value={form.patient_id}
        onChange={e => setForm({ ...form, patient_id: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
        required
      >
        <option value="">환자 선택</option>
        {patients.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select
        value={form.doctor_id}
        onChange={e => setForm({ ...form, doctor_id: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
        required
      >
        <option value="">의사 선택</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>{d.name} ({d.department})</option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={form.visited_at}
        onChange={e => setForm({ ...form, visited_at: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        required
      />
      <input
        placeholder="주호소 (예: 두통, 발열)"
        value={form.chief_complaint}
        onChange={e => setForm({ ...form, chief_complaint: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        required
      />
      <input
        placeholder="진단코드 (예: R51, 선택)"
        value={form.diagnosis_code}
        onChange={e => setForm({ ...form, diagnosis_code: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
      <textarea
        placeholder="치료 계획 (선택)"
        value={form.treatment_plan}
        onChange={e => setForm({ ...form, treatment_plan: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        rows={3}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '저장 중...' : '저장'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
        >
          취소
        </button>
      </div>
    </form>
  )
}
