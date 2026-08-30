<script setup lang="ts">
import type { Training } from '~/types/training';

const currentWord = defineModel<Training | null>('currentWord');

const { t } = useI18n();
</script>

<template>
  <div
  v-if="currentWord"
  class="text-center py-10 px-6 rounded-2xl border border-gray-200 border-dashed w-full bg-gray-50/50 shadow-inner">
    <span class="text-xs font-medium text-lime-600 bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
      {{ t('lang.en') }}
    </span>

    <h1 class="text-5xl font-black text-gray-800 tracking-tight mt-3">
      {{ currentWord.english }}
    </h1>
  </div>

  <div v-else class="text-center py-10 px-6 rounded-2xl border border-gray-200 border-dashed w-full bg-gray-50/50 shadow-inner flex flex-col items-center justify-center gap-3 animate-pulse">
    <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
    <div class="h-10 w-48 bg-gray-200 rounded-xl mt-2"></div>
  </div>
</template>