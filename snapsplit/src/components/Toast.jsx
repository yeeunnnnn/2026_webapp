import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

export function useToast() {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  return { toast, showToast }
}

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
      <div className="flex items-center gap-3 bg-[#1C1C2E] text-white px-5 py-3.5 rounded-[16px] shadow-2xl min-w-[240px]">
        <CheckCircle size={18} className="text-[#4F46E5] shrink-0" />
        <p className="text-[14px] font-semibold flex-1">{toast.message}</p>
        <button onClick={onClose}>
          <X size={15} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}