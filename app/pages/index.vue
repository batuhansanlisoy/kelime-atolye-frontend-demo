<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

const { t } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: 'Kelime Atölye',
  description: t('seo.index.des'),
  ogTitle: 'Kelime Atölye',
  ogDescription: t('seo.index.og_desc'),
  ogImage: '/img/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Kelime Atölye',
  twitterDescription: t('seo.index.twitter_desc'),
  twitterImage: '/img/logo.png',
});
</script>

<template>
  <div class="text-slate-800 flex flex-col items-center text-center">

    <section class="w-full max-w-7xl mx-auto py-8 px-1 lg:px-0 lg:py-20">
      
      <!-- Roket -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-6 tracking-wide uppercase shadow-2xs">
        <UIcon name="material-symbols:rocket-launch-rounded" class="size-4" />
        <span>
          {{ t('index.chip')}}
        </span>
      </div>

      <!-- Başlık -->
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
        {{ t('index.line_1')}} <br>
        <span class="bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          {{ t('index.line_2')}}
        </span>
      </h1>

      <!-- Alt Açıklama -->
      <p class="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
        {{ t('index.desc')}}
      </p>

      <!-- Butonlar -->
      <div class="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <NuxtLink
        :to="localePath('register')"
        class="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-teal-400 to-teal-500 text-white font-extrabold rounded-2xl text-base shadow-lg shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
          <span>
            {{ t('general.account.create')}}
          </span>
          <UIcon name="material-symbols:arrow-forward-rounded" class="size-5" />
        </NuxtLink>

        <NuxtLink
        :to="localePath('login')"
        class="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl text-base shadow-xs hover:bg-slate-50 transition-all">
          {{ t('general.account.already_have')}}
        </NuxtLink>
      </div>
    </section>

    <!-- Özellikler -->
    <section class="w-full max-w-7xl mx-auto px-1 lg:px-0">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        
        <div class="bg-white border-green-100 hover:bg-green-50 text-green-700 p-8 rounded-3xl border shadow-md flex flex-col justify-between space-y-4 group transition-colors">
          <div>
            <h2 class="text-lg font-bold">
              {{ t('index.card1.title')}}
            </h2>
            <p class="mt-2 text-sm leading-relaxed">
              {{ t('index.card1.desc')}}
            </p>
          </div>
        </div>

        <div class="bg-white border-amber-100 hover:bg-amber-50 text-amber-700 p-8 rounded-3xl border shadow-md flex flex-col justify-between space-y-4 group transition-colors">
          <div>
            <h2 class="text-lg font-bold">
              {{ t('index.card2.title')}}
            </h2>
            <p class="mt-2 text-sm leading-relaxed">
              {{ t('index.card2.desc')}}
            </p>
          </div>
        </div>

        <div class="bg-white border-red-100 hover:bg-red-50 text-red-700 p-8 rounded-3xl border shadow-md flex flex-col justify-between space-y-4 group transition-colors">
          <div>
            <h2 class="text-lg font-bold">
              {{ t('index.card3.title')}}
            </h2>
            <p class="mt-2 text-sm leading-relaxed">
              {{ t('index.card3.desc')}}
            </p>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>