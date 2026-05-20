import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImagePlus, ArrowRight, Sparkles } from 'lucide-react'
import { scanReceipt } from '../api/ocr'
import useSettlementStore from '../store/useSettlementStore'
import ProgressBar from '../components/ProgressBar'

export default function UploadPage() {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const setOcrResult = useSettlementStore((s) => s.setOcrResult)
  const setBankInfo = useSettlementStore((s) => s.setBankInfo)

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleNext = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      setBankInfo(bankName, accountNumber)
      const result = await scanReceipt(file)
      setOcrResult(result.receiptImageUrl, result.items)
      navigate('/review')
    } catch (e) {
      setError('영수증 분석에 실패했어요. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const uploadArea = (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full rounded-[24px] overflow-hidden cursor-pointer transition-all duration-200 mb-4
        ${dragging ? 'scale-[1.02] ring-2 ring-[#4F46E5]' : ''}
        ${preview ? 'h-[200px]' : 'h-[160px] border-2 border-dashed border-[#E2E4EE] bg-white hover:border-[#4F46E5] hover:bg-[#F5F4FF]'}`}
    >
      {preview ? (
        <img src={preview} alt="영수증" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F0EFFE] flex items-center justify-center">
            <ImagePlus size={22} className="text-[#4F46E5]" />
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-[#0F0F0F]">영수증 사진 올리기</p>
            <p className="text-[12px] text-[#8B8FA8] mt-0.5">탭하거나 드래그해서 업로드</p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* PC 레이아웃 */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-1/2 bg-[#4F46E5] flex flex-col items-center justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-[20px] font-bold tracking-tight">SnapSplit</span>
          </div>
          <h1 className="text-[48px] font-extrabold leading-tight tracking-tight mb-6">
            영수증 한 장으로<br />정산 끝.
          </h1>
          <p className="text-white/70 text-[18px] font-medium mb-12">사진을 올리면 자동으로 읽어드려요</p>
          <div className="flex flex-col gap-3 w-full max-w-[320px]">
            {['영수증 자동 인식 (OCR)', '조건부 N빵 계산', '토스 송금 링크 생성', '결과 공유'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 rounded-[14px] px-4 py-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[12px] font-bold shrink-0">{i + 1}</div>
                <span className="text-[15px] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center px-16">
          <div className="w-full max-w-[420px]">
            <h2 className="text-[28px] font-extrabold text-[#0F0F0F] mb-2">영수증 업로드</h2>
            <p className="text-[#8B8FA8] text-[15px] font-medium mb-6">사진을 올리고 정산을 시작해요</p>

            {uploadArea}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
            {preview && (
              <button onClick={() => inputRef.current.click()} className="w-full text-center text-[13px] text-[#8B8FA8] font-medium mb-4">
                다른 사진으로 변경
              </button>
            )}

            <div className="flex flex-col gap-2 mb-4">
              <div className="bg-white rounded-[18px] px-4 py-3.5">
                <p className="text-[11px] font-bold text-[#8B8FA8] mb-1.5 uppercase tracking-wider">은행명</p>
                <input
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  placeholder="국민은행"
                  autoComplete="off"
                  className="w-full text-[14px] font-medium text-[#0F0F0F] outline-none placeholder:text-[#C8CAD8] bg-transparent"
                />
              </div>
              <div className="bg-white rounded-[18px] px-4 py-3.5">
                <p className="text-[11px] font-bold text-[#8B8FA8] mb-1.5 uppercase tracking-wider">계좌번호</p>
                <input
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  placeholder="123456-12-123456"
                  autoComplete="off"
                  inputMode="numeric"
                  className="w-full text-[14px] font-medium text-[#0F0F0F] outline-none placeholder:text-[#C8CAD8] bg-transparent"
                />
              </div>
            </div>

            {error && <p className="text-center text-[13px] text-red-400 font-medium mb-4">{error}</p>}

            <button
              onClick={handleNext}
              disabled={!file || loading}
              className={`w-full h-[56px] rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all duration-200
                ${file ? 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-200 active:scale-[0.98]' : 'bg-[#E8E9F0] text-[#B0B3C5] cursor-not-allowed'}`}
            >
              {loading ? '분석 중...' : <> 정산 시작하기 <ArrowRight size={18} /> </>}
            </button>
            <p className="text-center text-[12px] text-[#B0B3C5] mt-4 font-medium">사진은 분석 후 즉시 삭제돼요</p>
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 */}
      <div className="lg:hidden flex flex-col items-center">
        <ProgressBar currentStep={0} />
        <div className="w-full max-w-[390px] px-5 py-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#4F46E5] flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-[15px] font-bold text-[#4F46E5] tracking-tight">SnapSplit</span>
            </div>
            <h1 className="text-[28px] font-extrabold text-[#0F0F0F] leading-tight tracking-tight">
              영수증 한 장으로<br />정산 끝.
            </h1>
            <p className="text-[#8B8FA8] text-[13px] mt-2 font-medium">사진을 올리면 자동으로 읽어드려요</p>
          </div>

          {uploadArea}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
          {preview && (
            <button onClick={() => inputRef.current.click()} className="w-full text-center text-[13px] text-[#8B8FA8] font-medium mb-4">
              다른 사진으로 변경
            </button>
          )}

          <div className="flex flex-col gap-2 mb-4">
            <div className="bg-white rounded-[18px] px-4 py-3.5">
              <p className="text-[11px] font-bold text-[#8B8FA8] mb-1.5 uppercase tracking-wider">은행명</p>
              <input
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                placeholder="국민은행"
                autoComplete="off"
                className="w-full text-[14px] font-medium text-[#0F0F0F] outline-none placeholder:text-[#C8CAD8] bg-transparent"
              />
            </div>
            <div className="bg-white rounded-[18px] px-4 py-3.5">
              <p className="text-[11px] font-bold text-[#8B8FA8] mb-1.5 uppercase tracking-wider">계좌번호</p>
              <input
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                placeholder="123456-12-123456"
                autoComplete="off"
                inputMode="numeric"
                className="w-full text-[14px] font-medium text-[#0F0F0F] outline-none placeholder:text-[#C8CAD8] bg-transparent"
              />
            </div>
          </div>

          {error && <p className="text-center text-[13px] text-red-400 font-medium mb-4">{error}</p>}

          <button
            onClick={handleNext}
            disabled={!file || loading}
            className={`w-full h-[56px] rounded-[16px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all duration-200
              ${file ? 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-200 active:scale-[0.98]' : 'bg-[#E8E9F0] text-[#B0B3C5] cursor-not-allowed'}`}
          >
            {loading ? '분석 중...' : <> 정산 시작하기 <ArrowRight size={18} /> </>}
          </button>
          <p className="text-center text-[12px] text-[#B0B3C5] mt-4 font-medium">사진은 분석 후 즉시 삭제돼요</p>
        </div>
      </div>

    </div>
  )
}