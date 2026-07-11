'use client'

import { useState } from 'react'
import { createDoctor } from '@/lib/api'

export default function DoctorForm({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', department: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createDoctor(form)
      setForm({ name: '', department: '' })
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
        + 새 의사 등록
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 shadow-sm space-y-3">
      <h2 className="font-semibold text-gray-800">새 의사 등록</h2>
      <input
        placeholder="이름"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        required
      />
      <input
        placeholder="진료과 (예: 내과)"
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 text-sm"
        required
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
