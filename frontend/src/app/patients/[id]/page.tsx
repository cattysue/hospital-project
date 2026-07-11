import Link from 'next/link'
import { getPatient, getMedicalRecords } from '@/lib/api'

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [patient, records] = await Promise.all([
    getPatient(Number(id)),
    getMedicalRecords(Number(id)),
  ])

  return (
    <div>
      <Link href="/patients" className="text-sm text-gray-500 hover:text-gray-700">
        ← 환자 목록
      </Link>

      <div className="bg-white border rounded-xl p-5 shadow-sm mt-4 mb-6">
        <h1 className="text-2xl font-bold mb-3">{patient.name}</h1>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-gray-500">생년월일</dt><dd>{patient.birth_date}</dd>
          <dt className="text-gray-500">전화번호</dt><dd>{patient.phone}</dd>
        </dl>
      </div>

      <h2 className="text-lg font-semibold mb-3">진료기록</h2>
      {records.length === 0 ? (
        <p className="text-gray-400 text-sm">진료기록이 없습니다.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {['진료일', '담당의', '주호소', '진단코드'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  {new Date(r.visited_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-4 py-3 text-sm">{r.doctor.name}</td>
                <td className="px-4 py-3 text-sm">{r.chief_complaint}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{r.diagnosis_code ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
