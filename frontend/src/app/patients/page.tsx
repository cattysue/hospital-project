'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPatients, deletePatient, type Patient } from '@/lib/api'
import PatientForm from './PatientForm'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    getPatients()
      .then(setPatients)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    setError(null)
    try {
      await deletePatient(id)
      load()
    } catch (e) {
      setError(e instanceof Error ? e.message : '삭제에 실패했습니다')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">환자 목록</h1>
      <PatientForm onSuccess={load} />
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">✕</button>
        </div>
      )}
      {loading ? (
        <p className="mt-6 text-sm text-gray-400">불러오는 중...</p>
      ) : (
        <table className="w-full mt-6 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['ID', '이름', '생년월일', '전화번호', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">
                  등록된 환자가 없습니다
                </td>
              </tr>
            ) : (
              patients.map(p => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{p.id}</td>
                  <td className="px-4 py-3">
                    <Link href={`/patients/${p.id}`} className="text-blue-600 hover:underline font-medium">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">{p.birth_date}</td>
                  <td className="px-4 py-3 text-sm">{p.phone}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(p.id)}
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
