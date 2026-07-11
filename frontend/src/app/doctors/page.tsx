import { getDoctors } from '@/lib/api'
import DoctorForm from './DoctorForm'

export const dynamic = 'force-dynamic'

export default async function DoctorsPage() {
  const doctors = await getDoctors()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">의사 목록</h1>
      <DoctorForm />
      <table className="w-full mt-6 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {['ID', '이름', '진료과'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-gray-400 text-sm">
                등록된 의사가 없습니다
              </td>
            </tr>
          ) : (
            doctors.map(d => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-500">{d.id}</td>
                <td className="px-4 py-3 text-sm font-medium">{d.name}</td>
                <td className="px-4 py-3 text-sm">{d.department}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
