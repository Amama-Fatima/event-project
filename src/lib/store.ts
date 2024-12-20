import { create } from 'zustand'
import { SearchState } from './types'

export const useSearchStore = create<SearchState>((set) => ({
  city: '',
  eventType: null,
  setCity: (city) => set({ city }),
  setEventType: (eventType) => set({ eventType }),
  resetEventType: () => set({ eventType: null }),
  reset: () => set({ city: '', eventType: null })
}))