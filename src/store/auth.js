import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        userName: null
     }),
    getters: {
        
      getUserName: (state) => state.userName ?state.userName: localStorage.getItem("userName")
    },
    actions: {
      login(userName) {
        this.userName = userName
        localStorage.setItem("userName", userName)
      },

      logout() {
        this.userName = null
        localStorage.clear();
      }

    },
})