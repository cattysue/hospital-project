'use client'

import { useState, useEffect } from 'react'
import { getDoctors, deleteDoctor, type Doctor } from '@/lib/api'
import DoctorForm from './DoctorForm'

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getDoctors()
      .then(setDoctors)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    await deleteDoctor(id)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">의사 목록</h1>
      <DoctorForm onSuccess={load} />
      {loading ? (
        <p className="mt-6 text-sm text-gray-400">불러오는 중...</p>
      ) : (
        <table className="w-full mt-6 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['ID', '이름', '진료과', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
                  등록된 의사가 없습니다
                </td>
              </tr>
            ) : (
              doctors.map(d => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{d.id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{d.name}</td>
                  <td className="px-4 py-3 text-sm">{d.department}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
