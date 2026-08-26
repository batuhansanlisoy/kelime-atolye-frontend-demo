<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWordApi } from '~/composables/api/word';
import type { Word } from '~/types/word';

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const selectedCategory = ref<'top100' | 'top500' | 'all'>('top100');
const selectedLetter = ref<string>('A');
const page = ref<number>(1);

// URL'deki slug değiştiğinde state'leri kontrol et ve yönet
watch(
  slug,
  (newSlug) => {
    page.value = 1;

    // 100 Kelime Kontrolü (TR ve EN)
    if (
      newSlug === 'ingilizce-en-cok-kullanilan-100-kelime' ||
      newSlug === 'english-most-used-100-words'
    ) {
      selectedCategory.value = 'top100';
    } 
    // 500 Kelime Kontrolü (TR ve EN)
    else if (
      newSlug === 'ingilizce-en-cok-kullanilan-500-kelime' ||
      newSlug === 'english-most-used-500-words'
    ) {
      selectedCategory.value = 'top500';
    } else {
      // Harf Dizini Kontrolü (Örn: Türkçe "ingilizce-a-ile-baslayan-kelimeler" veya İngilizce "english-words-starting-with-a")
      const trLetterMatch = newSlug.match(/^ingilizce-([a-z])-ile-baslayan-kelimeler$/);
      const enLetterMatch = newSlug.match(/^english-words-starting-with-([a-z])$/);

      if (trLetterMatch) {
        selectedCategory.value = 'all';
        selectedLetter.value = trLetterMatch[1].toUpperCase();
      } else if (enLetterMatch) {
        selectedCategory.value = 'all';
        selectedLetter.value = enLetterMatch[1].toUpperCase();
      } else {
        // Hiçbiri tutmuyorsa gerçek bir 404 fırlat
        throw createError({
          statusCode: 404,
          statusMessage: 'Aradığınız sayfa bulunamadı.',
          fatal: true,
        });
      }
    }
  },
  { immediate: true }
);

const { list } = useWordApi();

const { data: words, pending } = useAsyncData<Word[]>(
  () => `words-${selectedCategory.value}-${selectedLetter.value}-${page.value}`,
  () => list({
    sortBy: selectedCategory.value === 'all' ? 'alphabetical' : 'popular',
    limit: 100,
    page: page.value,
    letter: selectedCategory.value === 'all' ? selectedLetter.value : undefined,
  }),
  {
    watch: [page, selectedCategory, selectedLetter],
    immediate: true,
    default: () => []
  }
);
</script>

<template>
  <Dictionary
  v-if="!pending"
  v-model="page"
  :words="words"
  :category="selectedCategory">
    <template
    v-if="selectedCategory === 'all'" #alphabetical-bar>
      <DictionaryAlphabeticalBar
      v-model="selectedLetter" />
    </template>

    <template
    v-if="selectedCategory !== 'top100'"
    #pagination>
      <DictionaryPaginationBar
      v-model="page"
      :selected-category="selectedCategory" />
    </template>
  </Dictionary>
</template>