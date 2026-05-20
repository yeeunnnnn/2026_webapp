import { create } from 'zustand'

const useSettlementStore = create((set) => ({
  // OCR 결과
  receiptImageUrl: null,
  items: [], // [{ id, itemName, price }]

  // 참여자 설정
  participants: [], // [{ id, name }]
  mapping: {}, // { itemId: [participantId, ...] }

  // 정산 결과
  settlementId: null,
  settlementResult: null,

  // 액션
  bankName: '',
  accountNumber: '',
  setBankInfo: (bankName, accountNumber) => set({ bankName, accountNumber }),
  setOcrResult: (receiptImageUrl, items) => set({ receiptImageUrl, items }),
  setParticipants: (participants) => set({ participants }),
  setMapping: (mapping) => set({ mapping }),
  setSettlementId: (settlementId) => set({ settlementId }),
  setSettlementResult: (settlementResult) => set({ settlementResult }),
  reset: () => set({
    receiptImageUrl: null, items: [], participants: [],
    mapping: {}, settlementId: null, settlementResult: null,
    bankName: '', accountNumber: '',
  }),
}))

export default useSettlementStore