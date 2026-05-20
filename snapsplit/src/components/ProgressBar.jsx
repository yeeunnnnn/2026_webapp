const STEPS = ['업로드', '내역 확인', '참여자', '정산 결과']

export default function ProgressBar({ currentStep }) {
  return (
    <div className="w-full max-w-[390px] mx-auto px-5 pt-6 pb-2">
      <div className="flex items-center justify-between mb-2">
        {STEPS.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300
              ${idx < currentStep ? 'bg-[#4F46E5] text-white' :
                idx === currentStep ? 'bg-[#4F46E5] text-white ring-4 ring-indigo-100' :
                'bg-[#E8E9F0] text-[#B0B3C5]'}`}>
              {idx < currentStep ? '✓' : idx + 1}
            </div>
            <span className={`text-[10px] font-semibold hidden sm:block
              ${idx <= currentStep ? 'text-[#4F46E5]' : 'text-[#B0B3C5]'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-1 bg-[#E8E9F0] rounded-full mx-3">
        <div
          className="absolute h-1 bg-[#4F46E5] rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  )
}