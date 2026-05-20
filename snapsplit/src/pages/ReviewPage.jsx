import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, ArrowRight, ArrowLeft } from 'lucide-react'
import useSettlementStore from '../store/useSettlementStore'
import ProgressBar from '../components/ProgressBar'

export default function ReviewPage() {
  const navigate = useNavigate()
  const { items: storeItems, setOcrResult, receiptImageUrl } = useSettlementStore()
  const [items, setItems] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 10)
    if (storeItems.length > 0) {
      setItems(storeItems.map((item, idx) => ({
        id: item.id || idx + 1,
        name: item.itemName,
        price: item.price,
        quantity: 1,
      })))
    } else {
      setItems([])
    }
  }, [])

  const handlePriceChange = (id, value) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, price: Number(value.replace(/[^0-9]/g, '')) } : item
    ))
  }

  const handleNameChange = (id, value) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, name: value } : item
    ))
  }

  const handleQuantityChange = (id, value) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Number(value) } : item
    ))
  }

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleAdd = () => {
    setItems(prev => [...prev, { id: Date.now(), name: '', price: 0, quantity: 1 }])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleNext = () => {
    const updatedItems = items.map(item => ({
      id: item.id,
      itemName: item.name,
      price: item.price * item.quantity,
    }))
    setOcrResult(receiptImageUrl, updatedItems)
    navigate('/participants')
  }

  const emptyState = (
    <div className="bg-white rounded-[18px] px-4 py-8 flex flex-col items-center gap-2">
      <p className="text-[14px] font-semibold text-[#B0B3C5]">인식된 항목이 없어요</p>
      <p className="text-[12px] text-[#C8CAD8]">아래 버튼으로 직접 추가해주세요</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* PC 레이아웃 */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-1/2 bg-[#4F46E5] flex flex-col items-center justify-center px-16 text-white">
          <h1 className="text-[40px] font-extrabold leading-tight tracking-tight mb-4">내역 확인</h1>
          <p className="text-white/70 text-[18px] font-medium mb-8">잘못 인식된 항목은 직접 수정해요</p>
          <div className="bg-white/10 rounded-[20px] p-6 w-full max-w-[320px]">
            <p className="text-white/60 text-[13px] font-semibold mb-3 uppercase tracking-wider">총 합계</p>
            <p className="text-[48px] font-extrabold">{total.toLocaleString()}<span className="text-[24px] ml-1">원</span></p>
            <p className="text-white/60 text-[13px] mt-2">{items.length}개 항목</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center px-16 overflow-y-auto py-10">
          <div className="w-full max-w-[460px] mx-auto">
            <button onClick={() => navigate('/')} className="flex items-center gap-1 text-[#8B8FA8] text-[13px] font-medium mb-6">
              <ArrowLeft size={15} /> 뒤로
            </button>
            <div className="flex flex-col gap-2 mb-3">
              {items.length === 0 ? emptyState : items.map((item, idx) => (
                <div
                  key={item.id}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  className={`bg-white rounded-[18px] px-4 py-3.5 flex items-center gap-3 transition-all duration-300
                    ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                >
                  <span className="text-[12px] font-bold text-[#B0B3C5] w-5 shrink-0">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <input
                      value={item.name}
                      onChange={e => handleNameChange(item.id, e.target.value)}
                      placeholder="품목명"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="w-full text-[14px] font-semibold text-[#0F0F0F] outline-none bg-transparent placeholder:text-[#C8CAD8] mb-1"
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        value={item.price.toLocaleString()}
                        onChange={e => handlePriceChange(item.id, e.target.value)}
                        inputMode="numeric"
                        className="text-[13px] font-bold text-[#4F46E5] outline-none bg-transparent w-20"
                      />
                      <span className="text-[13px] text-[#B0B3C5]">원 ×</span>
                      <select
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, e.target.value)}
                        className="text-[13px] font-bold text-[#4F46E5] outline-none bg-transparent border-none cursor-pointer"
                      >
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <span className="text-[13px] text-[#B0B3C5]">개</span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-[#8B8FA8]">= {(item.price * item.quantity).toLocaleString()}원</span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="shrink-0 p-1 group">
                    <Trash2 size={15} className="text-[#D1D3DE] group-hover:text-red-400 transition-colors" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleAdd} className="flex items-center justify-center gap-1.5 text-[#4F46E5] text-[13px] font-semibold py-3.5 border-2 border-dashed border-[#E2E4EE] rounded-[18px] hover:bg-[#F5F4FF] active:scale-[0.98] transition mb-4">
              <Plus size={15} /> 항목 추가
            </button>
            <div className="bg-white rounded-[18px] px-4 py-4 flex justify-between items-center mb-6">
              <span className="text-[14px] font-semibold text-[#8B8FA8]">총 합계</span>
              <span className="text-[20px] font-extrabold text-[#0F0F0F]">{total.toLocaleString()}<span className="text-[15px] ml-0.5">원</span></span>
            </div>
            <button onClick={handleNext} className="w-full h-[56px] rounded-[16px] bg-[#4F46E5] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98] transition">
              참여자 설정 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="lg:hidden flex flex-col items-center">
        <ProgressBar currentStep={1} />
        <div className="w-full max-w-[390px] px-5 py-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-1 text-[#8B8FA8] text-[13px] font-medium mb-6">
            <ArrowLeft size={15} /> 뒤로
          </button>
          <h2 className="text-[26px] font-extrabold text-[#0F0F0F] tracking-tight mb-1">내역 확인</h2>
          <p className="text-[#8B8FA8] text-[13px] font-medium mb-6">잘못 인식된 항목은 직접 수정해요</p>
          <div className="flex flex-col gap-2 mb-3">
            {items.length === 0 ? emptyState : items.map((item, idx) => (
              <div
                key={item.id}
                style={{ transitionDelay: `${idx * 40}ms` }}
                className={`bg-white rounded-[18px] px-4 py-3.5 flex items-center gap-3 transition-all duration-300
                  ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              >
                <span className="text-[12px] font-bold text-[#B0B3C5] w-5 shrink-0">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <input
                    value={item.name}
                    onChange={e => handleNameChange(item.id, e.target.value)}
                    placeholder="품목명"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full text-[14px] font-semibold text-[#0F0F0F] outline-none bg-transparent placeholder:text-[#C8CAD8] mb-1"
                  />
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      value={item.price.toLocaleString()}
                      onChange={e => handlePriceChange(item.id, e.target.value)}
                      inputMode="numeric"
                      className="text-[13px] font-bold text-[#4F46E5] outline-none bg-transparent w-20"
                    />
                    <span className="text-[13px] text-[#B0B3C5]">원 ×</span>
                    <select
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, e.target.value)}
                      className="text-[13px] font-bold text-[#4F46E5] outline-none bg-transparent border-none cursor-pointer"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <span className="text-[13px] text-[#B0B3C5]">개</span>
                    {item.quantity > 1 && (
                      <span className="text-[11px] text-[#8B8FA8]">= {(item.price * item.quantity).toLocaleString()}원</span>
                    )}
                  </div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="shrink-0 p-1 group">
                  <Trash2 size={15} className="text-[#D1D3DE] group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleAdd} className="flex items-center justify-center gap-1.5 text-[#4F46E5] text-[13px] font-semibold py-3.5 border-2 border-dashed border-[#E2E4EE] rounded-[18px] hover:bg-[#F5F4FF] active:scale-[0.98] transition mb-4">
            <Plus size={15} /> 항목 추가
          </button>
          <div className="bg-white rounded-[18px] px-4 py-4 flex justify-between items-center mb-6">
            <span className="text-[14px] font-semibold text-[#8B8FA8]">총 합계</span>
            <span className="text-[20px] font-extrabold text-[#0F0F0F]">{total.toLocaleString()}<span className="text-[15px] ml-0.5">원</span></span>
          </div>
          <button onClick={handleNext} className="w-full h-[56px] rounded-[16px] bg-[#4F46E5] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98] transition">
            참여자 설정 <ArrowRight size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}