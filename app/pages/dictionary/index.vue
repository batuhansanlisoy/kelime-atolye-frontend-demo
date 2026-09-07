<script setup lang="ts">
import { useWordApi } from '~/composables/api/word';
import type { Word } from '~/types/word';

const { t } = useI18n();

const selectedCategory = ref<'top100' | 'top500' | 'all'>('top100');
const selectedLetter   = ref<string>('A');
const page             = ref<number>(1);

useSeoMeta({
  title: computed(() => {
    if (selectedCategory.value === 'top100') return t('seo.dictionary.top.english', { count: 100 });
    if (selectedCategory.value === 'top500') return t('seo.dictionary.top.english', { count: 500 });
    return t('seo.dictionary.az_with_start', { letter: selectedLetter.value });
  }),
  description: computed(() => {
    if (selectedCategory.value === 'top100') return t('dictionary.top100.title');
    if (selectedCategory.value === 'top500') return t('dictonary.top500.title');
    return t('seo.dictionary.az_with_start', { letter: selectedLetter.value });
  }),
  ogTitle: computed(() => t('seo.dictionary.title')),
  ogDescription: computed(() => t('seo.dictionary.desc')),
  ogImage: '/img/logo.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('seo.dictionary.title')),
  twitterDescription: computed(() => t('seo.dictionary.desc')),
  twitterImage: '/img/logo.png',
});

const { list } = useWordApi();

const { data: words, pending, error } = useAsyncData<Word[]>(
  `words-${selectedCategory}`,
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

watch(selectedCategory, () => {
  page.value = 1;
});
</script>

<template>
  <div class="my-14">
    <Dictionary
    v-if="!pending"
    v-model="page"
    :words="words">
  
      <template #desc>
        <div class="flex flex-col gap-2 bg-white text-gray-700 ">
          <h1 class="text-lg font-medium">
            {{ t('dictionary.h1') }}
          </h1>
          <p class="text-xs text-gray-600 italic">
            {{ t('dictionary.frequency.desc') }}
          </p>
        </div>
      </template>
   
      <template #category>
        <DictionaryCategory
        v-model="selectedCategory" />
      </template>
  
  
      <template
      v-if="selectedCategory === 'all'"
      #alphabetical-bar>
        <DictionaryAlphabeticalBar
        v-model="selectedLetter"/>
      </template>
  
      <template
      v-if="selectedCategory !== 'top100'"
      #pagination>
        <DictionaryPaginationBar
        v-model="page"
        :selected-category="selectedCategory" />
      </template>
    </Dictionary>
  </div>
</template>