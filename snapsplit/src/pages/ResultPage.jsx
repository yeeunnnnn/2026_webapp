import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, RotateCcw, Send, Link } from 'lucide-react'
import useSettlementStore from '../store/useSettlementStore'
import ProgressBar from '../components/ProgressBar'
import Toast, { useToast } from '../components/Toast'
import { createSettlement, calculateSettlement, getSettlementResult } from '../api/settlement'

const COLORS = ['#4F46E5', '#7C3AED', '#0EA5E9', '#10B981']

export default function ResultPage() {
  const navigate = useNavigate()
  const { id: urlId } = useParams()
  const { items, participants, mapping, settlementResult, setSettlementResult, bankName, accountNumber } = useSettlementStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [currentSettlementId, setCurrentSettlementId] = useState(urlId || null)
  const { toast, showToast } = useToast()

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        // 링크로 들어온 경우
        if (urlId) {
          const result = await getSettlementResult(urlId)
          setSettlementResult(result)
          return
        }

        // 이미 결과 있으면 스킵
        if (settlementResult) return

        const settlementData = {
          totalAmount: items.reduce((s, i) => s + i.price, 0),
          bankName,
          accountNumber,
          participants: participants.map(p => p.name),
          items: items.map(item => ({
            name: item.itemName,
            price: item.price,
            participants: (mapping[item.id] || []).map(pid => {
              const p = participants.find(p => p.id === pid)
              return p ? p.name : null
            }).filter(Boolean)
          }))
        }

        const res = await createSettlement(settlementData)
        const id = res.settlementId
        setCurrentSettlementId(id)
        const result = await calculateSettlement(id)
        setSettlementResult(result)
      } catch (e) {
        setError('정산 계산에 실패했어요. 다시 시도해주세요.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [urlId])

  const handleTossLink = (participant) => {
    if (!participant?.tossSendLink) return
    window.location.href = participant.tossSendLink
  }

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/result/${currentSettlementId}`
    if (navigator.share) {
      navigator.share({
        title: 'SnapSplit 정산 결과',
        text: '정산 결과를 확인하고 토스로 송금해요!',
        url: shareUrl,
      })
    } else {
      navigator.clipboard.writeText(shareUrl)
      showToast('정산 링크가 복사되었어요!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#4F46E5] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Check size={24} className="text-white" strokeWidth={3} />
          </div>
          <p className="text-[14px] font-semibold text-[#8B8FA8]">정산 계산 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[14px] text-red-400 font-medium mb-4">{error}</p>
          <button onClick={() => navigate('/participants')} className="text-[#4F46E5] font-bold text-[14px]">뒤로 가기</button>
        </div>
      </div>
    )
  }

  const result = settlementResult
  if (!result) return null

  const payingParticipants = result.participantResults.filter(p => p.participantId !== -1)
  const selectedParticipant = payingParticipants.find(p => p.participantId === selectedId)

  const ResultContent = () => (
    <>
      <p className="text-[13px] font-semibold text-[#8B8FA8] mb-3">내 이름을 선택하고 토스로 송금해요</p>
      <div className="flex flex-col gap-2 mb-4">
        {payingParticipants.map((p, i) => (
          <div
            key={p.participantId}
            onClick={() => setSelectedId(p.participantId === selectedId ? null : p.participantId)}
            className={`bg-white rounded-[18px] px-4 py-4 flex items-center gap-4 cursor-pointer transition-all active:scale-[0.98]
              ${selectedId === p.participantId ? 'ring-2 ring-[#4F46E5]' : 'hover:shadow-md'}`}
          >
            <div
              className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 text-white text-[14px] font-bold"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            >
              {p.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#0F0F0F]">{p.name}</p>
              <p className="text-[12px] text-[#8B8FA8] font-medium">개인 부담금</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[18px] font-extrabold text-[#0F0F0F]">
                {p.amountToPay.toLocaleString()}<span className="text-[13px] ml-0.5 font-semibold">원</span>
              </p>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${selectedId === p.participantId ? 'bg-[#4F46E5] border-[#4F46E5]' : 'border-[#D1D3DE]'}`}>
                {selectedId === p.participantId && <Check size={13} className="text-white" strokeWidth={3} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#EEF0FF] rounded-[14px] px-4 py-3 mb-6">
        <p className="text-[12px] text-[#4F46E5] font-semibold text-center">
          짜투리 금액은 총무가 부담해요
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* 토스 송금 버튼 */}
        <button
          onClick={() => handleTossLink(selectedParticipant)}
          disabled={!selectedParticipant?.tossSendLink}
          className={`w-full h-[56px] rounded-[16px] font-bold text-[15px] flex items-center justify-center gap-2 transition-all
            ${selectedParticipant?.tossSendLink
              ? 'bg-[#4F46E5] text-white active:scale-[0.98] shadow-lg shadow-indigo-200'
              : 'bg-[#E8E9F0] text-[#B0B3C5] cursor-not-allowed'}`}
        >
          <Send size={17} />
          {selectedParticipant ? `${selectedParticipant.amountToPay.toLocaleString()}원 토스로 송금` : '이름을 선택해주세요'}
        </button>

        {/* 정산 결과 링크 공유 */}
        {!urlId && currentSettlementId && (
          <button
            onClick={handleShareLink}
            className="w-full h-[56px] rounded-[16px] bg-[#FEE500] text-[#0F0F0F] font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Link size={17} /> 정산 결과 링크 공유
          </button>
        )}

        {!urlId && (
          <button
            onClick={() => navigate('/')}
            className="w-full h-[48px] rounded-[16px] text-[#B0B3C5] font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <RotateCcw size={15} /> 처음으로
          </button>
        )}
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Toast toast={toast} onClose={() => {}} />

      {/* PC 레이아웃 */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-1/2 bg-[#4F46E5] flex flex-col items-center justify-center px-16 text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
            <Check size={28} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-[48px] font-extrabold leading-tight tracking-tight mb-4">정산 완료!</h1>
          <p className="text-white/70 text-[18px] font-medium mb-8">
            총 <span className="text-white font-bold">{result.totalAmount.toLocaleString()}원</span> 정산됐어요
          </p>
          <div className="bg-white/10 rounded-[20px] p-6 w-full max-w-[320px]">
            <p className="text-white/60 text-[13px] font-semibold mb-4 uppercase tracking-wider">정산 요약</p>
            {payingParticipants.map((p, i) => (
              <div key={p.participantId} className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                    {p.name[0]}
                  </div>
                  <span className="text-white text-[14px] font-medium">{p.name}</span>
                </div>
                <span className="text-white font-bold text-[15px]">{p.amountToPay.toLocaleString()}원</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center px-16 overflow-y-auto py-10">
          <div className="w-full max-w-[460px] mx-auto">
            {!urlId && (
              <button onClick={() => navigate('/participants')} className="flex items-center gap-1 text-[#8B8FA8] text-[13px] font-medium mb-8">
                <ArrowLeft size={15} /> 뒤로
              </button>
            )}
            <h2 className="text-[28px] font-extrabold text-[#0F0F0F] tracking-tight mb-1">인당 부담금</h2>
            <p className="text-[#8B8FA8] text-[15px] font-medium mb-6">내 이름을 선택하고 토스로 송금해요</p>
            <ResultContent />
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="lg:hidden flex flex-col items-center">
        {!urlId && <ProgressBar currentStep={3} />}
        <div className="w-full max-w-[390px] px-5 py-6">
          {!urlId && (
            <button onClick={() => navigate('/participants')} className="flex items-center gap-1 text-[#8B8FA8] text-[13px] font-medium mb-8">
              <ArrowLeft size={15} /> 뒤로
            </button>
          )}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#4F46E5] flex items-center justify-center mb-4">
              <Check size={24} className="text-white" strokeWidth={3} />
            </div>
            <h2 className="text-[26px] font-extrabold text-[#0F0F0F] tracking-tight mb-1">정산 완료!</h2>
            <p className="text-[#8B8FA8] text-[13px] font-medium">
              총 <span className="text-[#0F0F0F] font-bold">{result.totalAmount.toLocaleString()}원</span> 정산됐어요
            </p>
          </div>
          <ResultContent />
        </div>
      </div>

    </div>
  )
}