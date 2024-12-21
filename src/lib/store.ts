import { create } from 'zustand'
import { SearchState } from './types'

export const useSearchStore = create<SearchState>((set) => ({
  city: '',
  eventType: null,
  dateFilter: null,
  setCity: (city) => set({ city }),
  setEventType: (eventType) => set({ eventType }),
  setDateFilter: (date) => set({ dateFilter: date }),
  resetEventType: () => set({ eventType: null }),
  resetDateFilter: () => set({ dateFilter: null }),
  reset: () => set({ city: '', eventType: null })
}))