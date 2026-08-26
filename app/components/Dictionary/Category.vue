<script setup lang="ts">
const selectedCategory = defineModel<'top100' | 'top500' | 'all'>({ required: true });
</script>

<template>
  <div class="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
      <button
      @click="selectedCategory = 'top100'"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
        selectedCategory === 'top100' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
      ]">
        Top 100
      </button>

      <button
      @click="selectedCategory = 'top500'"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
        selectedCategory === 'top500' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
      ]">
        Top 500
      </button>

      <button
      @click="selectedCategory = 'all'"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
        selectedCategory === 'all' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
      ]">
        Tüm Arşiv (A-Z)
      </button>
  </div>
</template>