<script setup lang="ts">
import { useUserWordApi, type Stats } from '~/composables/api/user_word';

const auth = useAuthStore();
const { t, locale } = useI18n();

const { stats } = useUserWordApi();
// Veriyi çekiyoruz
const { data: userStats, pending, error } = useAsyncData<Stats>(
  `user-${auth.user.id}-word-stats`,
  () => stats()
);
</script>

<template>
  <div
  v-if="!pending"
  class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    
    <!--Memorized Words Card-->
    <div class="bg-white border-3 border-teal-50 shadow-md p-5 rounded-2xl flex items-center justify-between">
      
      <div>
        <div class="flex gap-3 items-center">
          <p class="text-xs font-semibold text-sky-400 uppercase tracking-wider">
            {{ t('education.training.memorized_words').toLocaleUpperCase(locale) }}
          </p>

          <UTooltip
          :content="{ side: 'top' }"
          :ui="{
            content: 'bg-gray-700 text-white text-sm p-4 rounded-xl shadow-lg'
          }"
          :text="t('education.training.memorized_words.tooltip')">
            <UIcon name="i-lucide-info" class="size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors"/>
          </UTooltip>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight mt-1 text-aubergine">
          {{ userStats?.memorizedWordCount }}
        </h2>

        <p class="text-xs text-aubergine font-medium mt-1">
          {{ t('education.training.memorized.etched') }}
        </p>
      </div>
  
      <div class="flex items-center p-3 bg-gray-50 text-sky-500 rounded-xl">
        <UIcon name="lucide:brain" class="size-5" />
      </div>
  
    </div>
  
    <div class="bg-white border-3 border-sky-50 shadow-md p-5 rounded-2xl flex items-center justify-between">

      <div>
        <div class="flex gap-3 items-center">

          <p class="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            {{ t('education.training.my_word_pool').toLocaleUpperCase(locale) }}
          </p>

          <UTooltip
          :content="{ side: 'top' }"
          :ui="{
            content: 'bg-gray-700 text-white text-sm p-4 rounded-xl shadow-lg'
          }"
          :text="t('education.training.my_word_pool.tooltip')">
            <UIcon name="i-lucide-info" class="size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors"/>
          </UTooltip>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight mt-1 text-aubergine">
          {{ userStats?.totalWordCount }}
        </h2>

        <p class="text-xs text-aubergine font-medium mt-1">
          {{ t('education.training.my_word_pool.expand') }}
        </p>
      </div>

      <div class="flex items-center p-3 bg-gray-50 text-amber-500 rounded-xl">
        <UIcon name="lucide:layers" class="size-5"/>
      </div>

    </div>
  
    <div class="bg-white border-3 border-rose-50 shadow-md p-5 rounded-2xl flex items-center justify-between">

      <div>
        <div class="flex gap-3 items-center">
          
          <p class="text-xs font-semibold text-red-400 uppercase tracking-wider">
            {{ t('education.training.critical_fails').toLocaleUpperCase(locale) }}
          </p>

          <UTooltip
          :content="{ side: 'top' }"
          :ui="{
            content: 'bg-gray-700 text-white text-sm p-4 rounded-xl shadow-lg'
          }"
          :text="t('education.training.critical_fails.tooltip')">
            <UIcon name="i-lucide-info" class="size-5 text-slate-500 hover:text-slate-600 cursor-pointer transition-colors"/>
          </UTooltip>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight mt-1 text-aubergine">
          {{ userStats?.mistakedWordCount }}
        </h2>

        <p class="text-xs text-aubergine font-medium mt-1">
          {{ t('education.training.critical_fails.destroy') }}
        </p>
      </div>

      <div class="flex items-center p-3 bg-gray-50 text-red-500 rounded-xl">
        <UIcon name="lucide:badge-alert" class="size-5" />
      </div>

    </div>
  
  </div>
</template>