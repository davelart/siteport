import * as SecureStore from 'expo-secure-store'
import { create } from 'zustand'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  signin: (token: string) => Promise<void>
  signout: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  signin: async (token) => {
    await SecureStore.setItemAsync('auth_token', token)
    set({ token, isAuthenticated: true })
  },

  signout: async () => {
    await SecureStore.deleteItemAsync('auth_token')
    set({ token: null, isAuthenticated: false })
  },

  initialize: async () => {
    const token = await SecureStore.getItemAsync('auth_token')
    set({ token, isAuthenticated: !!token })
  },
}))