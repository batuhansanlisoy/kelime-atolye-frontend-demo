<script setup lang="ts">
import type { Word } from '~/types/word';

const page = defineModel<number>({ required: true });

const { words } = defineProps<{ words: Word[] }>();
</script>

<template>
  <div class="flex flex-col gap-5 max-w-7xl mx-auto w-full">
    
    <slot name="category" />
    <slot name="alphabetical-bar" />

    <DictionaryWords
    :words="words" />

    <slot name="pagination" />
  </div>
</template>