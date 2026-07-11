export const dynamic = 'force-dynamic'

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  let result: unknown = null
  let error: string | null = null

  try {
    const res = await fetch(`${apiUrl}/patients/`, { cache: 'no-store' })
    result = await res.json()
  } catch (e) {
    error = String(e)
  }

  return Response.json({ apiUrl, result, error })
}
