import Link from 'next/link'
import { getPatients } from '@/lib/api'
import PatientForm from './PatientForm'

export default async function PatientsPage() {
  const patients = await getPatients()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">환자 목록</h1>
      <PatientForm />
      <table className="w-full mt-6 border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {['ID', '이름', '생년월일', '전화번호'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
