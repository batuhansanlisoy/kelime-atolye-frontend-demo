<script setup lang="ts">
import { formatPhoneNumber } from '../utils/formatters/phone.ts';

definePageMeta({
  layout: false
});

const { t, locale } = useI18n();
const localePath    = useLocalePath();
const authStore     = useAuthStore();

const form = reactive({
  name: '',
  last_name: '',
  email: '',
  phone: '',
  gender: '' as 'male' | 'female' | '',
  password: ''
});

const is_registered = ref(false);

const errorMessage = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  // boşlukları siliyorum
  const cleanPhone = form.phone.replaceAll(' ', '');

  try {
    const result = await authStore.register({
      name: form.name,
      last_name: form.last_name,
      email: form.email,
      phone: cleanPhone,
      gender: form.gender as 'male' | 'female',
      password: form.password
    });

    if (result && result.success === false) {
      errorMessage.value = result.message
      return
    }

    is_registered.value = true;

    setTimeout(() => {
      navigateTo(localePath('login'));
    }, 4000);
  } catch (error: any) {
    is_registered.value = false;
    errorMessage.value = error?.message || 'Registration failed, please check your information.'
  } finally {
    isLoading.value = false
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
  
    <!-- Sağ Taraf: Kayıt Formu Alanı -->
    <div class="flex flex-col justify-center items-center flex-1 w-full h-full px-8 lg:px-16 overflow-y-auto bg-linear-to-r from-[#dbe3ea] via-white to-white">

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

          <h1 v-if="!is_registered" class="text-2xl font-black text-aubergine tracking-tight">
            {{ t('form.join_us') }}
          </h1>

          <p v-if="!is_registered" class="text-xs text-slate-500 mt-1.5 leading-relaxed">
            {{ t('form.register.reason') }}
          </p>
        </div>

        <!-- Form -->
        <form
        v-if="!is_registered"
        class="space-y-4" @submit.prevent="handleRegister">

          <!-- Ad ve Soyad (Yan Yana) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 tracking-wider">
                {{ t('form.register.name').toLocaleUpperCase(locale) }}
              </label>

              <input 
              v-model="form.name" 
              type="text" 
              required
              placeholder="Adınız"
              class="w-full px-4.5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 tracking-wider">
                {{ t('form.register.last_name').toLocaleUpperCase(locale) }}
              </label>

              <input 
              v-model="form.last_name" 
              type="text" 
              required
              placeholder="Soyadınız"
              class="w-full px-4.5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200">
            </div>
          </div>

          <!-- E-posta ve Telefon -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 tracking-wider">
                {{ t('form.register.mail').toLocaleUpperCase(locale) }}
              </label>

              <input 
              v-model="form.email" 
              type="email" 
              required
              placeholder="example@gmail.com"
              class="w-full px-4.5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 tracking-wider">
                {{ t('form.register.phone').toLocaleUpperCase(locale) }}
              </label>

              <input 
              :value="form.phone"
              type="text" 
              maxlength="14"
              required
              placeholder="0555 444 33 22"
              class="w-full px-4.5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200"
              @input="(e) => form.phone = formatPhoneNumber(e)">
            </div>
          </div>

          <!-- Cinsiyet ve Şifre -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 tracking-wider">
                {{ t('form.register.gender').toLocaleUpperCase(locale) }}
              </label>

              <select
              v-model="form.gender" 
              required
              class="w-full px-4.5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 cursor-pointer">
                <option value="" disabled>
                  {{ t('general.choose') }}
                </option>

                <option value="male">
                  {{ t('gender.male') }}
                </option>

                <option value="female">
                  {{ t('gender.female') }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 tracking-wider">
                {{ t('form.register.password').toLocaleUpperCase(locale) }}
              </label>

              <input
              v-model="form.password" 
              type="password" 
              required
              placeholder="••••••••"
              class="w-full px-4.5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all duration-200">
            </div>
          </div>

          <!-- Error Message -->
          <div
          v-if="errorMessage"
          class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <p class="text-xs text-amber-700 font-semibold">
              {{ errorMessage }}
            </p>
          </div>

          <!-- Submit Btn -->
          <button 
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 mt-2 bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-2xl text-base shadow-lg shadow-teal-500/25 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
            <UIcon
            v-if="isLoading"
            name="heroicons:arrow-path"
            class="size-5 animate-spin" />

            <span>
              {{ isLoading ? t('form.register.waiting') : t('general.register') }}
            </span>
          </button>
        </form>

        <div v-else class="py-12 flex flex-col items-center justify-center text-center space-y-4">
          <div class="flex gap-4 items-center">
            <UIcon name="heroicons:check-circle" class="size-7 text-lime-500" />
            <h2 class="text-xl font-bold text-slate-800">
              Kayıt Başarıyla Oluşturuldu!
            </h2>
          </div>
          
          <p class="text-sm text-slate-500 max-w-sm">
            Giriş ekranına yönlendiriliyorsunuz, lütfen bekleyin...
          </p>

          <UIcon name="heroicons:arrow-path" class="size-6 animate-spin text-teal-500 mt-2" />
        </div>

        <!-- Giriş Yap Linki -->
        <div class="text-center mt-6 pt-5 border-t border-slate-100">
          <p class="text-xs text-slate-500">
            {{ t('form.register.already_have_account') }}

            <NuxtLink
            :to="localePath('login')"
            class="text-teal-600 hover:text-teal-700 hover:underline font-bold ml-1">
              {{ t('form.login') }}
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
</style>