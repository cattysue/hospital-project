import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">병원 진료 관리 시스템</h1>
      <p className="text-gray-500 mb-8">환자 등록 · 의사 진료 · 진료기록 관리</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/patients', title: '환자 관리', desc: '환자 등록 및 조회' },
          { href: '/doctors', title: '의사 관리', desc: '의사 등록 및 조회' },
          { href: '/medical-records', title: '진료기록', desc: '진료기록 등록 및 조회' },
        ].map(({ href, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="block p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-1">{title}</h2>
            <p className="text-gray-500 text-sm">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
