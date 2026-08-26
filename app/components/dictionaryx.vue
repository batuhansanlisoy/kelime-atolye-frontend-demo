<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useWordApi } from '~/composables/api/word';

// --- STATE TANIMLARI ---
const selectedCategory = ref<'top100' | 'top500' | 'all'>('top100');
const selectedLetter = ref<string>('A');
const currentPage = ref<number>(1);
const pageSize = ref<number>(100); // Her zaman 100'erli çekilecek şekilde güncellendi

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const { list } = useWordApi();
const dictionaryWords = ref<any[]>([]);
const isLoading = ref<boolean>(false);

// --- API İSTEK FONKSİYONU ---
const fetchWords = async () => {
  isLoading.value = true;
  try {
    let limitVal = pageSize.value;
    
    // Top 100 için tek sayfa (100 adet) yeterli
    if (selectedCategory.value === 'top100') {
      limitVal = 100;
    } 
    // Top 500 için her istekte 100 adet çekip sayfalayacağız
    else if (selectedCategory.value === 'top500') {
      limitVal = 100;
    }

    dictionaryWords.value = await list({
      sortBy: selectedCategory.value === 'all' ? 'alphabetical' : 'popular',
      limit: limitVal,
      page: currentPage.value,
      letter: selectedCategory.value === 'all' ? selectedLetter.value : undefined,
    });
  } catch (error) {
    console.error('Kelime çekerken hata:', error);
  } finally {
    isLoading.value = false;
  }
};

// --- WATCHERS ---
watch(selectedCategory, (newCat) => {
  currentPage.value = 1;
  if (newCat !== 'all') {
    selectedLetter.value = '';
  } else {
    selectedLetter.value = 'A';
  }
  fetchWords();
});

watch(selectedLetter, (newLetter) => {
  if (selectedCategory.value === 'all' && newLetter) {
    currentPage.value = 1;
    fetchWords();
  }
});

watch(currentPage, () => {
  fetchWords();
});

onMounted(() => {
  fetchWords();
});

const nextPage = () => {
  // Top 100 için maksimum 1 sayfa olmalı, Top 500 için maksimum 5 sayfa (5 * 100 = 500) sınırı koyabiliriz
  if (selectedCategory.value === 'top100') return; // Top 100'de tek sayfa yeterli
  
  if (selectedCategory.value === 'top500' && currentPage.value >= 5) return;

  if (dictionaryWords.value.length === pageSize.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="flex flex-col gap-5 max-w-7xl mx-auto w-full">
    
    <!-- Üst Kontrol Paneli -->
    <div class="">
      
      <!-- Kategori Seçimi -->
      <div class="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
        <button
          @click="selectedCategory = 'top100'"
          :class="[
            'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
            selectedCategory === 'top100' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
          ]"
        >
          Top 100
        </button>
        <button
          @click="selectedCategory = 'top500'"
          :class="[
            'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
            selectedCategory === 'top500' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
          ]"
        >
          Top 500
        </button>
        <button
          @click="selectedCategory = 'all'"
          :class="[
            'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
            selectedCategory === 'all' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
          ]"
        >
          Tüm Arşiv (A-Z)
        </button>
      </div>
    </div>

    <!-- Alfabetik Bar -->
    <div v-if="selectedCategory === 'all'" class="flex items-center gap-1 bg-white border border-gray-100 p-3 rounded-2xl shadow-xs overflow-x-auto">
      <button
        v-for="letter in alphabet"
        :key="letter"
        @click="selectedLetter = letter"
        :class="[
          'bg-gray-50 w-8 h-8 flex items-center justify-center font-bold rounded-xl transition-all shrink-0 cursor-pointer',
          selectedLetter === letter
            ? 'text-3xl text-aubergine shadow-xs'
            : 'text-xs text-gray-600 hover:bg-gray-100 border border-gray-100'
        ]"
      >
        {{ letter }}
      </button>
    </div>

    <!-- Kelime Izgarası -->
    <div class="relative min-h-[300px]">
      
      <!-- Yükleniyor Katmanı -->
      <div v-if="isLoading" class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10 rounded-2xl">
        <span class="text-xs font-bold text-gray-400 animate-pulse">Yükleniyor...</span>
      </div>

      <!-- Boş Durum -->
      <div v-if="dictionaryWords.length === 0 && !isLoading" class="flex items-center justify-center py-16 text-gray-400 text-xs bg-white border border-gray-100 rounded-2xl">
        Bu kriterlere uygun kelime bulunamadı.
      </div>

      <!-- Grid Kartlar Yapısı -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div 
          v-for="word in dictionaryWords" 
          :key="word.id"
          class="bg-white border border-gray-100 p-3.5 rounded-xl shadow-xs hover:border-gray-200 transition-all flex flex-col justify-between gap-2"
        >
          <!-- Üst Kısım: İngilizce ve Frekans -->
          <div class="flex items-center justify-between">
            <span class="font-bold text-aubergine text-sm truncate">{{ word.english }}</span>
            <span class="px-1.5 py-0.5 text-[10px] font-mono bg-gray-50 text-gray-400 rounded border border-gray-100">
              {{ word.frequency ? word.frequency.toFixed(1) : '-' }}
            </span>
          </div>

          <!-- Alt Kısım: Türkçe Anlamı -->
          <div class="text-gray-600 text-xs font-medium truncate" :title="word.turkish">
            {{ word.turkish }}
          </div>
        </div>
      </div>

    </div>

    <!-- Sayfalama (Alt Bar) - Top 500 ve Tüm Arşiv için aktif -->
    <!-- <div v-if="selectedCategory !== 'top100'" class="flex items-center justify-between px-2 py-1">
      <span class="text-xs text-gray-400 font-medium">
        Sayfa: <span class="font-bold text-aubergine">{{ currentPage }}</span> 
        <span v-if="selectedCategory === 'all'"> | Harf: <span class="font-bold text-aubergine">{{ selectedLetter }}</span></span>
      </span>
      
      <div class="flex items-center gap-2">
        <UButton 
          variant="outline" 
          size="xs" 
          class="rounded-xl cursor-pointer h-8 text-xs px-3" 
          :disabled="currentPage === 1 || isLoading"
          @click="prevPage"
        >
          Önceki
        </UButton>
        <UButton 
          variant="outline" 
          size="xs" 
          class="rounded-xl cursor-pointer h-8 text-xs px-3" 
          :disabled="(selectedCategory === 'top500' && currentPage >= 5) || dictionaryWords.length < pageSize || isLoading"
          @click="nextPage"
        >
          Sonraki
        </UButton>
      </div>
    </div> -->

  </div>
</template>