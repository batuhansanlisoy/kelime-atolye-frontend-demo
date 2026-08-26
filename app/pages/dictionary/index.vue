<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useWordApi } from '~/composables/api/word';
import type { Word } from '~/types/word';

const selectedCategory = ref<'top100' | 'top500' | 'all'>('top100');
const selectedLetter = ref<string>('A');
const page = ref<number>(1);

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
  <Dictionary
  v-if="!pending"
  v-model="page"
  :words="words">

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
</template>