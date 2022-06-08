import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';

export const useTokenStore = defineStore('counter', {
  state: () => ({
    token: '',
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    async setToken(token) {
      this.token = token;
    },
    async setTokenLS(){
      const token = LocalStorage.getItem('web_token')
      if (token !== undefined && token!== null){
        this.token = token
      }
    },
    async deleteToken(){
      LocalStorage.remove('web_token')
      this.token = ''
    },
    async verifyToken(){
      const formData = new FormData
      formData.append('web_token',this.token)
      const response = await api.post('allow/',formData)
      return response.data
    }
  },
});
