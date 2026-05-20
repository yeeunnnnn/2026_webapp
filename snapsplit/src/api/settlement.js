import { apiRequest } from './client'

export async function createSettlement(data) {
  return apiRequest('/api/v1/settlements', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function calculateSettlement(settlementId) {
  return apiRequest(`/api/v1/settlements/${settlementId}/calculate`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
}

export async function getSettlementResult(settlementId) {
  return apiRequest(`/api/v1/settlements/${settlementId}/calculate`, {
    method: 'GET',
  })
}