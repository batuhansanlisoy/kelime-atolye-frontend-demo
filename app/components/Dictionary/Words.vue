<script setup lang="ts">
import type { Word } from '~/types/word';

const { words } = defineProps<{ words: Word[] }>();
const { t } = useI18n();
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
        class="bg-white border border-gray-100 p-3.5 rounded-xl shadow-xs hover:border-gray-200 transition-all flex items-center justify-between gap-3">
          
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <!--Kelime Etkiketleri-->
            <div class="flex flex-col gap-1 border-r pr-3 border-gray-200 shrink-0">
              <span class="text-emerald-800 font-semibold text-xs leading-5">
                {{ t('lang.en') }}
              </span>
              <span class="text-sky-800 font-semibold text-xs leading-5">
                {{ t('lang.tr') }}
              </span>
            </div>

            <!-- Kelime Karşılıklar -->
            <div class="flex flex-col flex-1 gap-1 min-w-0">
              <span class="font-bold text-aubergine text-sm truncate leading-5" :title="word.english">
                {{ word.english }}
              </span>
              <span class="font-bold text-aubergine text-sm truncate leading-5" :title="word.turkish">
                {{ word.turkish }}
              </span>
            </div>

          </div>

          <!-- Frequency -->
          <div class="shrink-0">
            <span class="px-1.5 py-0.5 text-[11px] font-mono bg-gray-50 text-gray-500 rounded border border-gray-100">
              {{ word.frequency ? word.frequency.toFixed(1) : '-' }}
            </span>
          </div>

        </div>
      </div>
    </div>
</template>