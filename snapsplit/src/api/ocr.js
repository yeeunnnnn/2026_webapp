const BASE_URL = import.meta.env.VITE_API_URL || 'https://maroon-affix-hankie.ngrok-free.dev'

export async function scanReceipt(file) {
  const token = localStorage.getItem('accessToken')
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${BASE_URL}/api/v1/ocr/receipt`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  })

  if (!res.ok) throw new Error('OCR 분석 실패')
  return res.json()
}