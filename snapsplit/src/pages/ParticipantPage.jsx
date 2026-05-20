import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X, ArrowRight, ArrowLeft } from 'lucide-react'
import useSettlementStore from '../store/useSettlementStore'
import ProgressBar from '../components/ProgressBar'

export default function ParticipantPage() {
  const navigate = useNavigate()
  const { items: storeItems, setParticipants: saveParticipants, setMapping: saveMapping } = useSettlementStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 10)
  }, [])

  const items = storeItems.length > 0 ? storeItems.map((item, idx) => ({
    id: item.id || idx + 1,
    name: item.itemName,
    price: item.price,
  })) : []

  const [participants, setParticipants] = useState([])
  const [newName, setNewName] = useState('')
  // 기본값: 모든 참여자가 모든 품목에 참여 (전체 선택)
  const [mapping, setMapping] = useState(
    Object.fromEntries(items.map(item => [item.id, []]))
  )

  const handleAdd = () => {
    if (!newName.trim()) return
    const newId = Date.now()
    const newParticipant = { id: newId, name: newName.trim() }
    setParticipants(prev => {
      const updated = [...prev, newParticipant]
      // 새 참여자 추가시 모든 품목에 자동으로 추가
      setMapping(prevMapping => {
        const next = { ...prevMapping }
        items.forEach(item => {
          next[item.id] = [...(next[item.id] || []), newId]
        })
        return next
      })
      return updated
    })
    setNewName('')
  }

  const handleDelete = (id) => {
    setParticipants(prev => prev.filter(p => p.id !== id))
    setMapping(prev => {
      const next = { ...prev }
      Object.keys(next).forEach(itemId => {
        next[itemId] = next[itemId].filter(pid => pid !== id)
      })
      return next
    })
  }

  const toggleMapping = (itemId, participantId) => {
    setMapping(prev => {
      const current = prev[itemId] || []
      if (current.includes(participantId)) {
        return { ...prev, [itemId]: current.filter(id => id !== participantId) }
      } else {
        return { ...prev, [itemId]: [...current, participantId] }
      }
    })
  }

  const handleNext = () => {
    saveParticipants(participants)
    saveMapping(mapping)
    navigate('/result')
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* PC 레이아웃 */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-1/2 bg-[#4F46E5] flex flex-col items-center justify-center px-16 text-white">
          <h1 className="text-[40px] font-extrabold leading-tight tracking-tight mb-4">참여자 설정</h1>
          <p className="text-white/70 text-[18px] font-medium mb-8">안 먹은 사람만 터치해서 제외해요</p>
          <div className="bg-white/10 rounded-[20px] p-6 w-full max-w-[320px]">
            <p className="text-white/60 text-[13px] font-semibold mb-3 uppercase tracking-wider">참여자</p>
            {participants.length === 0 ? (
              <p className="text-white/40 text-[15px]">아직 추가된 참여자가 없어요</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {participants.map(p => (
                  <span key={p.id} className="bg-white/20 text-white rounded-full px-3 py-1 text-[13px] font-semibold">{p.name}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center px-16 overflow-y-auto py-10">
          <div className="w-full max-w-[460px] mx-auto">
            <button onClick={() => navigate('/review')} className="flex items-center gap-1 text-[#8B8FA8] text-[13px] font-medium mb-6">
              <ArrowLeft size={15} /> 뒤로
            </button>

            {/* 참여자 추가 */}
            <div className="flex gap-2 mb-4">
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                placeholder="이름 입력"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                className="flex-1 bg-white rounded-[14px] px-4 h-[48px] text-[14px] font-medium outline-none placeholder:text-[#C8CAD8] text-[#0F0F0F]"
              />
              <button onClick={handleAdd} className="bg-[#4F46E5] text-white rounded-[14px] px-5 h-[48px] font-bold text-[14px] flex items-center gap-1 shrink-0 active:scale-[0.97] transition">
                <Plus size={15} /> 추가
              </button>
            </div>

            {participants.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {participants.map(p => (
                  <div key={p.id} className="flex items-center gap-1.5 bg-[#EEF0FF] text-[#4F46E5] rounded-full px-3.5 py-1.5 text-[13px] font-semibold">
                    {p.name}
                    <button onClick={() => handleDelete(p.id)} className="hover:text-red-400 transition-colors"><X size={13} /></button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[12px] text-[#8B8FA8] font-medium mb-3">💡 기본적으로 전원 참여예요. 안 먹은 사람만 터치해서 제외하세요.</p>

            <div className="flex flex-col gap-2 mb-8">
              {items.map((item, idx) => (
                <div key={item.id}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  className={`bg-white rounded-[18px] px-4 py-3.5 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[14px] font-semibold text-[#0F0F0F]">{item.name}</span>
                    <span className="text-[13px] font-bold text-[#4F46E5]">{item.price.toLocaleString()}원</span>
                  </div>
                  {participants.length === 0 ? (
                    <p className="text-[12px] text-[#C8CAD8]">위에서 참여자를 먼저 추가해주세요</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {participants.map(p => {
                        const selected = (mapping[item.id] || []).includes(p.id)
                        return (
                          <button
                            key={p.id}
                            onClick={() => toggleMapping(item.id, p.id)}
                            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-[0.95]
                              ${selected ? 'bg-[#4F46E5] text-white' : 'bg-[#F0F1F5] text-[#B0B3C5] line-through'}`}
                          >
                            {p.name}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="w-full h-[56px] rounded-[16px] bg-[#4F46E5] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98] transition">
              정산 결과 보기 <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="lg:hidden flex flex-col items-center">
        <ProgressBar currentStep={2} />
        <div className="w-full max-w-[390px] px-5 py-6">
          <button onClick={() => navigate('/review')} className="flex items-center gap-1 text-[#8B8FA8] text-[13px] font-medium mb-6">
            <ArrowLeft size={15} /> 뒤로
          </button>
          <h2 className="text-[26px] font-extrabold text-[#0F0F0F] tracking-tight mb-1">참여자 설정</h2>
          <p className="text-[#8B8FA8] text-[13px] font-medium mb-6">안 먹은 사람만 터치해서 제외해요</p>

          <div className="flex gap-2 mb-4">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="이름 입력"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              className="flex-1 bg-white rounded-[14px] px-4 h-[48px] text-[14px] font-medium outline-none placeholder:text-[#C8CAD8] text-[#0F0F0F]"
            />
            <button onClick={handleAdd} className="bg-[#4F46E5] text-white rounded-[14px] px-5 h-[48px] font-bold text-[14px] flex items-center gap-1 shrink-0 active:scale-[0.97] transition">
              <Plus size={15} /> 추가
            </button>
          </div>

          {participants.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {participants.map(p => (
                <div key={p.id} className="flex items-center gap-1.5 bg-[#EEF0FF] text-[#4F46E5] rounded-full px-3.5 py-1.5 text-[13px] font-semibold">
                  {p.name}
                  <button onClick={() => handleDelete(p.id)} className="hover:text-red-400 transition-colors"><X size={13} /></button>
                </div>
              ))}
            </div>
          )}

          <p className="text-[12px] text-[#8B8FA8] font-medium mb-3">💡 기본적으로 전원 참여예요. 안 먹은 사람만 터치해서 제외하세요.</p>

          <div className="flex flex-col gap-2 mb-8">
            {items.length === 0 ? (
              <div className="bg-white rounded-[18px] px-4 py-8 flex flex-col items-center gap-2">
                <p className="text-[14px] font-semibold text-[#B0B3C5]">이전 단계에서 항목을 추가해주세요</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={item.id}
                  style={{ transitionDelay: `${idx * 40}ms` }}
                  className={`bg-white rounded-[18px] px-4 py-3.5 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[14px] font-semibold text-[#0F0F0F]">{item.name}</span>
                    <span className="text-[13px] font-bold text-[#4F46E5]">{item.price.toLocaleString()}원</span>
                  </div>
                  {participants.length === 0 ? (
                    <p className="text-[12px] text-[#C8CAD8]">위에서 참여자를 먼저 추가해주세요</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {participants.map(p => {
                        const selected = (mapping[item.id] || []).includes(p.id)
                        return (
                          <button
                            key={p.id}
                            onClick={() => toggleMapping(item.id, p.id)}
                            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-[0.95]
                              ${selected ? 'bg-[#4F46E5] text-white' : 'bg-[#F0F1F5] text-[#B0B3C5] line-through'}`}
                          >
                            {p.name}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <button onClick={handleNext} className="w-full h-[56px] rounded-[16px] bg-[#4F46E5] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-[0.98] transition">
            정산 결과 보기 <ArrowRight size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}