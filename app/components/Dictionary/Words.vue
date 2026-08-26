<script setup lang="ts">
import type { Word } from '~/types/word';

const { words } = defineProps<{ words: Word[] }>();
</script>
<template>
    <div class="relative min-h-75">
      <!-- Boş Durum -->
      <div
      v-if="words.length === 0"
      class="flex items-center justify-center py-16 text-gray-400 text-xs bg-white border border-gray-100 rounded-2xl">
        Bu kriterlere uygun kelime bulunamadı.
      </div>

      <!-- Grid Kartlar Yapısı -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div 
        v-for="word in words" 
        :key="word.id"
        class="bg-white border border-gray-100 p-3.5 rounded-xl shadow-xs hover:border-gray-200 transition-all flex flex-col justify-between gap-2">
          
          <!-- Üst Kısım: İngilizce ve Frekans -->
          <div class="flex items-center justify-between">
            <span class="font-bold text-aubergine text-sm truncate">
              {{ word.english }}
            </span>

            <span
            class="px-1.5 py-0.5 text-[10px] font-mono bg-gray-50 text-gray-400 rounded border border-gray-100">
              {{ word.frequency ? word.frequency.toFixed(1) : '-' }}
            </span>
          </div>

          <!-- Alt Kısım: Türkçe Anlamı -->
          <div
          class="text-gray-600 text-xs font-medium truncate"
          :title="word.turkish">
            {{ word.turkish }}
          </div>
        </div>
      </div>

    </div>
</template>