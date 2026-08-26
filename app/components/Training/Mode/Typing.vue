<script setup lang="ts">
import { useTrainingData } from '~/composables/api/training';
import { useUserWordApi } from '~/composables/api/user_word';
import type { Training } from '~/types/training';

const { list }       = useTrainingData();
const { bulkInsert } = useUserWordApi();

const {
  data: trainingWords,
  pending,
  error
} = await useAsyncData<Training[]>(
  'training-words-typing',
  () => list()
);

const currentIndex   = ref(0);
const userInput      = ref('');
const isAnswered     = ref(false);
const isCorrect      = ref<boolean | null>(null);
const correctCount   = ref(0);
const wrongCount     = ref(0);
const isFinished     = ref(false);

const inputRef = ref<HTMLInputElement | null>(null);
const answersList = ref<Array<{ wordId: number; correctCount: number; wrongCount: number }>>([]);

const currentWord = computed(() => {
  return trainingWords.value?.[currentIndex.value] || null;
});

const progressPercentage = computed(() => {
  if (!trainingWords.value || trainingWords.value.length === 0) return 0;
  return ((currentIndex.value + 1) / trainingWords.value.length) * 100;
});

const handleCheckAnswer = () => {
  if (isAnswered.value || !currentWord.value || !userInput.value.trim()) return;

  isAnswered.value = true;

  const cleanUserAnswer = userInput.value.trim().toLocaleLowerCase('tr-TR');
  const cleanCorrectAnswer = currentWord.value.turkish.trim().toLocaleLowerCase('tr-TR');

  const isCurrentCorrect = cleanUserAnswer === cleanCorrectAnswer;

  if (isCurrentCorrect) {
    isCorrect.value = true;
    correctCount.value++;
  } else {
    isCorrect.value = false;
    wrongCount.value++;
  }

  answersList.value.push({
    wordId: currentWord.value.id,
    correctCount: isCurrentCorrect ? 1 : 0,
    wrongCount: isCurrentCorrect ? 0 : 1,
  });

  setTimeout(() => {
    nextQuestion();
  }, 1500);
};

const nextQuestion = () => {
  userInput.value = '';
  isAnswered.value = false;
  isCorrect.value = null;

  if (trainingWords.value && currentIndex.value < trainingWords.value.length - 1) {
    currentIndex.value++;
    nextTick(() => {
      inputRef.value?.focus();
    });
  } else {
    isFinished.value = true;
    submitAnswers();
  }
};

async function submitAnswers() {
  try {
    await bulkInsert(answersList.value);
    console.log('Yazma antrenman sonuçları başarıyla kaydedildi!');
  } catch (error) {
    console.error('Kayıt sırasında hata oluştu:', error);
  } finally {
    navigateTo('/tr/egitim');
  }
}

const getInputContainerClass = () => {
  if (isAnswered.value === false) {
    return 'bg-white border-gray-200 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100 shadow-sm';
  }
  if (isCorrect.value) {
    return 'bg-green-50 border-green-500 ring-4 ring-green-100 shadow-sm';
  }
  return 'bg-red-50 border-red-500 ring-4 ring-red-100 shadow-sm';
};
</script>

<template>
  <div
    v-if="currentWord"
    class="flex flex-col items-center gap-6 p-8 border border-slate-100 rounded-3xl shadow-sm w-full bg-white"
  >

    <!-- Üst İlerleme ve Sayaç Alanı -->
    <div class="w-full space-y-2">
      <div class="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
        <span>Soru {{ currentIndex + 1 }} / {{ trainingWords?.length }}</span>
        <div class="flex items-center gap-4">
          <span class="text-green-600">Doğru: {{ correctCount }}</span>
          <span class="text-rose-600">Yanlış: {{ wrongCount }}</span>
        </div>
      </div>

      <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          class="h-full bg-green-500 transition-all duration-300 rounded-full" 
          :style="{ width: `${progressPercentage}%` }" 
        />
      </div>
    </div>

    <!-- Sorulan Kelime Kutusu (Full Genişlik) -->
    <div class="text-center py-10 px-6 rounded-2xl border border-slate-200 border-dashed w-full bg-slate-50/50 shadow-inner">
      <span class="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
        İngilizce
      </span>
      <h1 class="text-5xl font-black text-slate-800 tracking-tight mt-3">
        {{ currentWord.english }}
      </h1>
    </div>

    <!-- Yazma Alanı ve Kontrol Formu -->
    <form @submit.prevent="handleCheckAnswer" class="w-full space-y-4">
      <div :class="['flex items-center justify-between w-full p-3 border-2 rounded-2xl transition-all duration-200', getInputContainerClass()]">
        
        <input 
          ref="inputRef"
          v-model="userInput"
          type="text"
          :disabled="isAnswered"
          placeholder="Türkçe karşılığını klavyeden yazın..."
          class="w-full px-4 py-3 bg-transparent text-slate-800 font-semibold text-lg outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
          autofocus
          autocomplete="off"
        />

        <!-- Durum İkonu -->
        <div v-if="isAnswered" class="px-4 flex items-center text-3xl">
          <UIcon 
            v-if="isCorrect" 
            name="material-symbols:check-circle-rounded" 
            class="text-green-600" 
          />
          <UIcon 
            v-else 
            name="material-symbols:cancel-rounded" 
            class="text-rose-500" 
          />
        </div>

        <!-- Gönder Butonu -->
        <button 
          v-else
          type="submit"
          class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base rounded-xl transition cursor-pointer shadow-sm">
          Kontrol Et
        </button>

      </div>

      <!-- Yanlış Yapıldığında Doğru Cevap Bildirimi -->
      <div v-if="isAnswered && !isCorrect" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center text-sm font-semibold text-rose-700 shadow-sm">
        Doğru Cevap: <span class="underline font-bold text-base ml-1">{{ currentWord.turkish }}</span>
      </div>
    </form>

  </div>
</template>