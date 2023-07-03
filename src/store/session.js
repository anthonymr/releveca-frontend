import { defineStore } from 'pinia'

export const useSession = defineStore('session-store', {
  state: () => {
    return {
      token: null,
      user: null,
      corporation: null,
      fetching: false
    }
  },
})