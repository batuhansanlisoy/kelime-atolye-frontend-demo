import { defineStore } from 'pinia'

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends LoginPayload {
  name: string;
  last_name: string;
  phone: string,
  gender: 'male' | 'female';
}

// burda token ve user objesini cookieya kayıt ediyorum
// token zaten istek atarken headera eklenecek
// user verisi de bana sürekli lazım o yüzde kayıt ediyoruz.
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('token').value || null,
    user: useCookie('user').value ? JSON.parse(useCookie('user').value as string) : null
  }),

  actions: {
    async login(credentials: LoginPayload) {
      const { apiHost } = useApiUrl();

      const baseUrl = apiHost();
      const url = baseUrl+'/auth/login';

      try {
        const response = await $fetch<{ accessToken: string; user?: any }>(url, {
          method: 'POST',
          body: credentials,
        })

        this.token = response.accessToken;
        this.user  = response.user

        const tokenCookie = useCookie('token');
        const userCookie  = useCookie('user');

        tokenCookie.value = response.accessToken;
        userCookie.value  = JSON.stringify(response.user);

        return { success: true }
      } catch (error: any) {
        console.error('Giriş hatası:', error)
        return { 
          success: false, 
          message: error.data?.message || 'Giriş yapılamadı' 
        }
      }
    },
    async register(credentials: RegisterPayload) {
      const { apiHost } = useApiUrl();

      const baseUrl = apiHost();
      const url = baseUrl+'/auth/register';

      try {
        await $fetch(url, {
          method: 'POST',
          body: credentials,
        });

        return { success: true }
      } catch (error: any) {
        return {
          success: false,
          message: error.data?.message || 'Register Error'
        }
      }
    },
    logout() {
      this.token = null;
      this.user  = null;

      const tokenCookie = useCookie('token');
      const userCookie  = useCookie('user');

      const localePath = useLocalePath();

      tokenCookie.value = null;
      userCookie.value  = null;

      navigateTo(localePath('login'));
    }
  }
})