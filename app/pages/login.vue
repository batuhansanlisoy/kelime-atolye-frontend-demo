<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
});

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  // Doğru Kullanım: Store'u fonksiyonun içerisinden çağırıyoruz
  const authStore = useAuthStore();
  const localePath = useLocalePath();

  const result = await authStore.login({
    email: email.value,
    password: password.value 
  })

  isLoading.value = false

  if (result.success) {
    navigateTo(localePath('education'));
  } else {
    errorMessage.value = result.message || 'Giriş yapılamadı'
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-700 dark:text-zinc-100 px-4 transition-colors duration-300">
    <div class="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
      
      <!-- Başlık Alanı -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Kelime Atölye</h1>
        <p class="text-sm text-red-600 dark:text-red-400 mt-2">Devam etmek için hesabına giriş yap</p>
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1.5">E-posta Adresi</label>
          <input 
            v-model="email" 
            type="email" 
            required
            placeholder="ornek@email.com"
            class="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg text-sm text-gray-700 dark:text-zinc-100 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          >
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-zinc-300 mb-1.5">Şifre</label>
          <input
            v-model="password" 
            type="password" 
            required
            placeholder="••••••••"
            class="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg text-sm text-gray-700 dark:text-zinc-100 focus:outline-none focus:border-red-500 dark:focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
          >
        </div>

        <!-- Hata Mesajı Alanı -->
        <p v-if="errorMessage" class="text-xs text-red-600 dark:text-red-400 font-medium text-center">
          {{ errorMessage }}
        </p>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-300">
            <input 
              v-model="rememberMe" 
              type="checkbox" 
              class="w-4 h-4 rounded bg-gray-50 dark:bg-zinc-950 border-gray-300 dark:border-zinc-800 text-red-600 focus:ring-0 cursor-pointer"
            >
            <span class="text-xs">Beni hatırla</span>
          </label>
          <a href="#" class="text-xs text-red-600 dark:text-zinc-400 hover:underline dark:hover:text-zinc-200 transition">Şifremi unuttum?</a>
        </div>

        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-lg text-sm active:scale-[0.99] transition disabled:opacity-50"
        >
          {{ isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
        </button>
      </form>

      <!-- Alt Bilgi -->
      <p class="text-center text-xs text-gray-500 dark:text-zinc-500 mt-6">
        Hesabın yok mu? 
        <a href="#" class="text-red-600 dark:text-zinc-300 hover:underline font-medium">Kayıt ol</a>
      </p>

    </div>
  </div>
</template>