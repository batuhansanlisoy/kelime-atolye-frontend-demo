<script setup lang="ts">
import { ref } from 'vue';

// Dummy Veriler (Kendi API yapına göre burayı entegre edersin)
const searchQuery = ref('');
const selectedFilter = ref('all');

const words = ref([
  { id: 1, english: 'Resilience', turkish: 'Dayanıklılık, direnç', status: 'memorized', correctCount: 12, wrongCount: 1, level: -14.2 },
  { id: 2, english: 'Ambiguous', turkish: 'Belirsiz, iki anlamlı', status: 'mistaked', correctCount: 3, wrongCount: 5, level: -8.1 },
  { id: 3, english: 'Meticulous', turkish: 'Titiz, ince eleyip sık dokuyan', status: 'learning', correctCount: 6, wrongCount: 2, level: -11.0 },
  { id: 4, english: 'Comprehensive', turkish: 'Kapsamlı, etraflı', status: 'memorized', correctCount: 15, wrongCount: 0, level: -16.5 },
  { id: 5, english: 'Scrutinize', turkish: 'İncelemek, dikkate almak', status: 'mistaked', correctCount: 2, wrongCount: 4, level: -7.5 },
]);

const filters = [
  { label: 'Tümü', value: 'all' },
  { label: 'Ezberlenenler', value: 'memorized' },
  { label: 'Kritik Hatalar', value: 'mistaked' },
  { label: 'Çalışılıyor', value: 'learning' },
];

// Filtreleme mantığı
const filteredWords = computed(() => {
  return words.value.filter(word => {
    const matchesSearch = word.english.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          word.turkish.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = selectedFilter.value === 'all' || word.status === selectedFilter.value;
    return matchesSearch && matchesFilter;
  });
});
</script>

<template>
  <div class="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
    
    <!-- Sayfa Başlığı ve Aksiyon Alanı -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm">
      <div>
        <h1 class="text-2xl font-extrabold text-aubergine tracking-tight">Kelime Havuzu</h1>
        <p class="text-sm text-gray-500 mt-1">Sisteme eklenen, çalıştığın ve hafızana kazıdığın tüm kelimeler.</p>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <UButton 
          icon="i-lucide-plus" 
          color="primary" 
          size="md"
          class="rounded-xl font-semibold shadow-sm w-full md:w-auto justify-center">
          Yeni Kelime Ekle
        </UButton>
      </div>
    </div>

    <!-- Arama ve Filtreleme Çubuğu -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Arama Inputu -->
      <div class="w-full sm:w-80">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Kelime veya anlam ara..."
          size="lg"
          class="w-full"
          :ui="{ rounded: 'rounded-xl' }"
        />
      </div>

      <!-- Kategori / Durum Filtreleri -->
      <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
            'px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer',
            selectedFilter === filter.value
              ? 'bg-aubergine text-white shadow-sm'
              : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Kelime Kartları / Listesi Grid Yapısı -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      <div 
        v-for="word in filteredWords" 
        :key="word.id"
        class="bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all p-5 rounded-2xl flex flex-col justify-between gap-4 relative group"
      >
        <!-- Üst Kısım: İngilizce & Durum Rozeti -->
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-bold text-aubergine tracking-tight">{{ word.english }}</h3>
            <p class="text-sm text-gray-600 font-medium mt-0.5">{{ word.turkish }}</p>
          </div>

          <!-- Durum Badge -->
          <span :class="[
            'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg',
            word.status === 'memorized' ? 'bg-teal-50 text-teal-600 border border-teal-100' : '',
            word.status === 'mistaked' ? 'bg-rose-50 text-rose-600 border border-rose-100' : '',
            word.status === 'learning' ? 'bg-amber-50 text-amber-600 border border-amber-100' : '',
          ]">
            {{ word.status === 'memorized' ? 'Ezberlendi' : word.status === 'mistaked' ? 'Hatalı' : 'Çalışılıyor' }}
          </span>
        </div>

        <!-- Alt Kısım: İstatistikler ve Skor Detayı -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-500 font-medium">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1 text-lime-600">
              <UIcon name="i-lucide-check-circle-2" class="size-4" /> {{ word.correctCount }}
            </span>
            <span class="flex items-center gap-1 text-rose-600">
              <UIcon name="i-lucide-x-circle" class="size-4" /> {{ word.wrongCount }}
            </span>
          </div>

          <!-- Kelime Zorluk/Performans Seviyesi -->
          <div class="text-[11px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
            Skor: {{ word.level }}
          </div>
        </div>

      </div>

    </div>

    <!-- Boş Durum (Eğer aranan kelime bulunamazsa) -->
    <div v-if="filteredWords.length === 0" class="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 rounded-3xl text-center gap-3">
      <div class="p-3 bg-gray-50 text-gray-400 rounded-2xl">
        <UIcon name="i-lucide-search-x" class="size-8" />
      </div>
      <h3 class="font-bold text-aubergine text-base">Aradığınız kriterde kelime bulunamadı</h3>
      <p class="text-xs text-gray-400">Farklı bir arama yapabilir veya filtreleri sıfırlayabilirsiniz.</p>
    </div>

  </div>
</template>