const BASE_URL = import.meta.env.VITE_API_URL || 'https://maroon-affix-hankie.ngrok-free.dev'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || '서버 오류가 발생했어요')
  }

  return res.json().catch(() => null)
}