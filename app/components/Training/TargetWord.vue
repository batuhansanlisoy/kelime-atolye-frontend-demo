<script setup lang="ts">
import type { Training } from '~/types/training';

const currentWord = defineModel<Training>('currentWord', { required: true });

const { t } = useI18n();
</script>

<template>
  <div class="text-center py-10 px-6 rounded-2xl border border-gray-200 border-dashed w-full bg-gray-50/50 shadow-inner">
    <span class="text-xs font-medium text-lime-600 bg-lime-50 px-3 py-1 rounded-full border border-lime-200">
      {{ t('lang.en') }}
    </span>

    <h1 class="text-5xl font-black text-gray-800 tracking-tight mt-3">
      {{ currentWord.english }}
    </h1>
  </div>
</template>