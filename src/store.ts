import { create } from 'zustand'

interface ConfiguratorState {
  frame: string
  keysBase: string
  keysAccent: string
  cable: string
  plate: string
  details: string
  exploded: boolean
  setColor: (part: string, color: string) => void
  toggleExploded: () => void
}

export const useStore = create<ConfiguratorState>((set) => ({
  // Default Colors (Mewah & Estetik)
  frame: '#111827', 
  keysBase: '#e5e7eb', 
  keysAccent: '#ff1a1a',
  cable: '#111827',
  plate: '#1f2937',
  details: '#00f0ff',
  
  // Animation State
  exploded: false,
  
  // Actions
  setColor: (part, color) => set((state) => ({ ...state, [part]: color })),
  toggleExploded: () => set((state) => ({ ...state, exploded: !state.exploded }))
}))
