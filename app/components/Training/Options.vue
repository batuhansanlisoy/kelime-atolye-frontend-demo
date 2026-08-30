<script setup lang="ts">
import type { Training } from '~/types/training';
import type { Word } from '~/types/word';

const emits = defineEmits<{
  (e: 'selected', option: Word): void
}>()

const selectedOption = defineModel<number | null>('selectedOption');
const currentIndex   = defineModel<number>('currentIndex', { default: 0 });
const currentWord    = defineModel<Training | null>('currentWord');

const getOptionClass = (option: any) => {
  const isSelected = selectedOption.value === option.id;
  const isCorrectOption = option.turkish === currentWord.value?.turkish;

  // 1. Henüz seçim yapılmadıysa normal durum
  if (selectedOption.value === null) {
    return 'bg-white border-gray-200 hover:border-lime-400 hover:bg-lime-50/30 text-gray-700 shadow-sm';
  }

  // 2. Doğru şık (Seçilsin veya seçilmesin her zaman yeşil vurgulanır)
  if (isCorrectOption) {
    return 'bg-lime-50 border-lime-500 text-lime-900 shadow-sm';
  }

  // 3. Kullanıcının yanlış seçtiği şık
  if (isSelected && !isCorrectOption) {
    return 'bg-red-50 border-red-500 text-red-900 shadow-sm';
  }

  // 4. Diğer pasif kalan şıklar
  return 'opacity-40 border-gray-200 bg-gray-50 text-gray-400';
};

const handleSelectOption = (option: Word) => {
  if (selectedOption.value !== null || !currentWord.value) return;

  selectedOption.value = option.id;

  emits('selected', option);

  setTimeout(() => {
    nextQuestion();
  }, 1500);
};

const nextQuestion = () => {
  selectedOption.value = null;
  currentIndex.value++;
};
</script>

<template>
  <div
  v-if="currentWord"
  class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">

    <button 
    v-for="option in currentWord.options"
    :key="option.id"
    class="w-full p-4 rounded-2xl border font-semibold text-left transition-all duration-200 flex justify-between items-center group"
    :disabled="selectedOption !== null"
    :class="getOptionClass(option)"
    @click="handleSelectOption(option)">

      <span class="text-base">
        {{ option.turkish }}
      </span>

      <!-- Cevaba Göre İkonlar -->
      <span v-if="selectedOption !== null" class="text-xl flex items-center">
        <!-- Doğru İkonu -->
        <Icon 
        v-if="option.turkish === currentWord.turkish" 
        name="heroicons:check-circle-20-solid" 
        class="text-lime-600" />

        <!-- Yanlış İkon -->
        <Icon 
        v-else-if="selectedOption === option.id" 
        name="heroicons:x-circle-20-solid" 
        class="text-red-500" />
      </span>

    </button>

  </div>

  <div
  v-else
  class="text-center py-10 px-6 rounded-2xl border border-gray-200 border-dashed w-full bg-gray-50/50 shadow-inner flex flex-col items-center justify-center gap-3 animate-pulse">
    <div class="h-6 w-16 bg-gray-200 rounded-full"></div>
    <div class="h-10 w-48 bg-gray-200 rounded-xl mt-2"></div>
  </div>
</template>