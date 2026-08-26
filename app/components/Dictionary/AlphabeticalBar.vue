<script setup lang="ts">
const selectedLetter = defineModel<string>({ required: true });

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
</script>
<template>
  <div class="flex items-center gap-1 bg-white border border-gray-100 p-3 rounded-2xl shadow-xs overflow-x-auto">
    <button
    v-for="letter in alphabet"
    :key="letter"
    @click="selectedLetter = letter"
    :class="[
      'bg-gray-50 w-8 h-8 flex items-center justify-center font-bold rounded-xl transition-all shrink-0 cursor-pointer',
      selectedLetter === letter
        ? 'text-3xl text-aubergine shadow-xs'
        : 'text-xs text-gray-600 hover:bg-gray-100 border border-gray-100'
    ]">
      {{ letter }}
    </button>
  </div>
</template>