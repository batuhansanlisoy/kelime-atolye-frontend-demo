<script setup lang="ts">
import type { Training } from '~/types/training';

const { trainingWords } = defineProps<{ trainingWords: Training[] }>();

const currentIndex = defineModel<number>('currentIndex', { default: 0 });

const progressPercentage = computed(() => {
  if (!trainingWords || trainingWords.length === 0) return 0;
  return ((currentIndex.value + 1) / trainingWords.length) * 100;
});
</script>

<template>
  <div class="w-full space-y-2">
    <div class="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
      <span>
        Soru {{ currentIndex + 1 }} / {{ trainingWords?.length }}
      </span>

      <slot name="stats" />
    </div>

    <div class="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
      class="h-full bg-lime-500 transition-all duration-300 rounded-full" 
      :style="{ width: `${progressPercentage}%` }" />
    </div>
  </div>
</template>