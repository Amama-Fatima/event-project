import { create } from 'zustand'
import { SearchState } from './types'

export const useSearchStore = create<SearchState>((set) => ({
  city: '',
  eventType: null,
  dateFilter: null,
  eventName: '',
  setCity: (city) => set({ city }),
  setEventType: (eventType) => set({ eventType }),
  setDateFilter: (date) => set({ dateFilter: date }),
  setEventName: (name) => set({ eventName: name }),
  resetEventType: () => set({ eventType: null }),
  resetDateFilter: () => set({ dateFilter: null }),
  resetEventName: () => set({ eventName: '' }),
  reset: () => set({ city: '', eventType: null })
}))