import { getMedicalRecords, getPatients, getDoctors } from '@/lib/api'
import MedicalRecordForm from './MedicalRecordForm'

export default async function MedicalRecordsPage() {
  const [records, patients, doctors] = await Promise.all([
    getMedicalRecords(),
    getPatients(),
    getDoctors(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">진료기록</h1>
      <MedicalRecordForm patients={patients} doctors={doctors} />
      <table className="w-full mt-6 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {['진료일', '환자', '담당의', '주호소', '진단코드'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">
                진료기록이 없습니다
              </td>
            </tr>
          ) : (
            records.map(r => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  {new Date(r.visited_at).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-4 py-3 text-sm font-medium">{r.patient.name}</td>
                <td className="px-4 py-3 text-sm">{r.doctor.name}</td>
                <td className="px-4 py-3 text-sm">{r.chief_complaint}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{r.diagnosis_code ?? '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
