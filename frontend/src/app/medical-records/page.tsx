'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getMedicalRecords, deleteMedicalRecord, type MedicalRecord } from '@/lib/api'
import MedicalRecordForm from './MedicalRecordForm'

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getMedicalRecords()
      .then(setRecords)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    await deleteMedicalRecord(id)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">진료기록</h1>
      <MedicalRecordForm onSuccess={load} />
      {loading ? (
        <p className="mt-6 text-sm text-gray-400">불러오는 중...</p>
      ) : (
        <table className="w-full mt-6 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['진료일', '환자', '담당의', '주호소', '진단코드', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">
                  등록된 진료기록이 없습니다
                </td>
              </tr>
            ) : (
              records.map(r => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    {new Date(r.visited_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/patients/${r.patient.id}`} className="text-blue-600 hover:underline font-medium">
                      {r.patient.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">{r.doctor.name}</td>
                  <td className="px-4 py-3 text-sm">{r.chief_complaint}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{r.diagnosis_code ?? '-'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(r.id)}
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
