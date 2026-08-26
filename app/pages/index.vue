<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const i18n       = useI18n();
const router     = useRouter();
const isLeaving  = ref(false);
const localePath = useLocalePath();

// Hemen Başla'ya basıldığında çalışacak sihirli fonksiyon
const handleStartAdventure = (e: MouseEvent) => {
  e.preventDefault()
  isLeaving.value = true

  // Animasyon bitince kayıt sayfasına veya dashboard'a yönlendir
  setTimeout(() => {
    router.push('/register')
  }, 900) // 0.9 saniye sonra sayfa uçmuş olacak
}
</script>

<template>
  <div class="min-h-screen bg-white text-slate-800 flex flex-col justify-between selection:bg-teal-500 selection:text-white relative overflow-hidden">
    
    <!-- Sayfa Ayrılış (Fade / Parça Parça Yok Olma) Efekti İçin Kapsayıcı -->
    <div :class="{ 'opacity-0 -translate-y-7.5 scale-95': isLeaving }" class="flex flex-col justify-between flex-1 transition-all duration-700 ease-in-out">
      
      <!-- Hero Section -->
      <main class="w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center text-center">
        
        <!-- Üst Mini Rozet -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-6 tracking-wide uppercase shadow-2xs">
          <UIcon name="material-symbols:rocket-launch-rounded" class="size-4" />
          <span>
            {{ i18n.t('index.chip')}}
          </span>
        </div>

        <!-- Ana Başlık -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl leading-[1.1]">
          {{ i18n.t('index.line_1')}} <br>
          <span class="bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            {{ i18n.t('index.line_2')}}
          </span>
        </h1>

        <!-- Alt Açıklama -->
        <p class="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
          {{ i18n.t('index.desc')}}
        </p>

        <!-- CTA Butonları (Animasyonu Tetikleyen Yer) -->
        <div class="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a
          href="/register" 
          @click="handleStartAdventure"
          class="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-teal-400 to-teal-500 text-white font-extrabold rounded-2xl text-base shadow-lg shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
            <span>
              {{ i18n.t('general.account.create')}}
            </span>

            <UIcon
            name="material-symbols:arrow-forward-rounded"
            class="size-5" />
          </a>

          <NuxtLink
          :to="localePath('login')"
          class="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl text-base shadow-xs hover:bg-slate-50 transition-all">
            {{ i18n.t('general.account.already_have')}}
          </NuxtLink>
        </div>

        <!-- Özellikler Kartları -->
        <div class="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          
          <div class="bg-white border-green-50 hover:bg-green-50 text-green-700 p-8 rounded-3xl border-3 shadow-md flex flex-col justify-between space-y-4 group transition-colors">
            <div>
              <h3 class="text-lg font-bold">
                {{ i18n.t('index.card1.title')}}
              </h3>
              <p class="mt-2 text-sm leading-relaxed">
                {{ i18n.t('index.card1.desc')}}
              </p>
            </div>
          </div>

          <div class="bg-white border-amber-50 hover:bg-amber-50 text-amber-700 p-8 rounded-3xl border-3 shadow-md flex flex-col justify-between space-y-4 group transition-colors">
            <div>
              <h3 class="text-lg font-bold">
                {{ i18n.t('index.card2.title')}}
              </h3>
              <p class="mt-2 text-sm leading-relaxed">
                {{ i18n.t('index.card2.desc')}}
              </p>
            </div>
          </div>

          <div class="bg-white border-red-50 hover:bg-red-50 text-red-700 p-8 rounded-3xl border-3 shadow-md flex flex-col justify-between space-y-4 group transition-colors">
            <div>
              <h3 class="text-lg font-bold">
                {{ i18n.t('index.card3.title')}}
              </h3>
              <p class="mt-2 text-sm leading-relaxed">
                {{ i18n.t('index.card3.desc')}}
              </p>
            </div>
          </div>

        </div>

      </main>

    </div>

    <!-- Tıklandığında Arkadan Beliren Gizli Macera Ekranı (Dümenden şov kısmı) -->
    <div :class="{ 'opacity-100 pointer-events-auto': isLeaving, 'opacity-0 pointer-events-none': !isLeaving }" class="absolute inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center text-white transition-all duration-700 ease-in-out">
      <div class="flex flex-col items-center space-y-4 scale-110">
        <!-- Dönen Roket veya İkon -->
        <div class="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 animate-bounce">
          <UIcon name="material-symbols:rocket-launch-rounded" class="size-8" />
        </div>
        <h2 class="text-2xl font-black tracking-tight">Atölye Kapıları Aralanıyor...</h2>
        <p class="text-slate-400 text-sm">Macera başlıyor, hazırım de!</p>
      </div>
    </div>

  </div>
</template>