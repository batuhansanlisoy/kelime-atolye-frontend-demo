<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
});

const { t, locale }      = useI18n();
const localePath = useLocalePath();

const email      = ref('');
const password   = ref('');
const rememberMe = ref(false);

const errorMessage = ref('');
const isLoading    = ref(false);

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const authStore = useAuthStore();

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
  <div class="flex w-full h-screen overflow-hidden bg-white">
    <!-- Sol Görsel -->
    <div class="hidden lg:block flex-1 h-full relative">
      <NuxtImg
      src="/img/login.png"
      alt="Login Screen"
      class="h-screen w-full object-cover" />

      <div class="logo-cover"></div>
    </div>
  
    <!-- Form Field -->
    <div class="flex flex-col justify-center items-center flex-1 w-full h-full px-1 lg:px-16 overflow-y-auto bg-linear-to-r from-[#dbe3ea] via-white to-white">
      
      <div class="w-full max-w-xl bg-white border border-slate-100 rounded-3xl p-8 lg:p-10 shadow-xl shadow-teal-950/5">
        <!--Lang Switcher-->
        <div class="flex justify-end">
          <UIHeaderLang />
        </div>

        <!-- Logo ve Karşılama Başlığı -->
        <div class="flex flex-col items-center text-center mb-8">
          <NuxtLink
          :to="localePath('/')"
          class="cursor-pointer">
            <NuxtImg
            src="/img/logo.png"
            alt="Logo"
            class="h-auto w-36 object-contain mb-4" />
          </NuxtLink>

          <h1 class="text-2xl font-black text-aubergine tracking-tight">
            {{ t('form.welcome_again') }}
          </h1>

          <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">
            {{ t('form.login_for_train') }}
          </p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleLogin">
          
          <!-- Mail -->
          <div>
            <label class="form-label">
              {{ t('form.mail').toLocaleUpperCase(locale) }}
            </label>

            <input 
            v-model="email" 
            type="email" 
            required
            placeholder="example@gmail.com"
            class="form-input">
          </div>

          <!-- Password -->
          <div>
            <label class="form-label">
              {{ t('form.password').toLocaleUpperCase(locale) }}
            </label>

            <input
            v-model="password" 
            type="password" 
            required
            placeholder="••••••••"
            class="form-input">
          </div>

          <!-- Error Field -->
          <div
          v-if="errorMessage"
          class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p class="text-xs text-amber-700 font-semibold">
              {{ errorMessage }}
            </p>
          </div>

          <!-- Remember me & fortted password -->
          <div class="flex items-center justify-between text-sm py-1">
            <label class="flex items-center gap-2.5 cursor-pointer text-slate-600 hover:text-slate-800 select-none">
              <input 
              v-model="rememberMe" 
              type="checkbox" 
              class="w-4 h-4 rounded-md bg-slate-50 border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer accent-teal-600">
              
              <span class="text-xs font-medium">
                {{ t('form.remember_me') }}
              </span>
            </label>

            <a href="#" class="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline transition">
              {{ t('form.password.forgetted') }}
            </a>
          </div>

          <!-- Submit -->
          <button 
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-teal-500/25 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
            <UIcon
            v-if="isLoading"
            name="heroicons:arrow-path"
            class="size-5 animate-spin" />

            <span>
              {{ isLoading ? t('form.login.waiting') : t('form.login') }}
            </span>
          </button>
        </form>

        <!-- Kayıt Ol -->
        <div class="text-center mt-8 pt-6 border-t border-slate-100">
          <p class="text-xs text-slate-500">
            {{ t('form.no_account') }}

            <NuxtLink
            :to="localePath('register')"
            class="text-teal-600 hover:text-teal-700 hover:underline font-bold ml-1">
              {{ t('form.quick_register') }}
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";
.logo-cover {
  @apply absolute inset-0 bg-linear-to-tr from-teal-950/40 to-transparent pointer-events-none
}

.form-label {
  @apply block text-xs font-bold text-slate-700 mb-2 tracking-wider
}

.form-input {
  @apply w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200
}
</style>