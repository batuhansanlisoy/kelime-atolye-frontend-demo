<script setup lang="ts">
const selectedCategory = defineModel<'top100' | 'top500' | 'all'>({ required: true });
const { t } = useI18n();
</script>

<template>
  <nav
  role="tablist"
  class="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
      <button
      role="tab"
      :aria-selected="selectedCategory === 'top100'"
      @click="selectedCategory = 'top100'"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
        selectedCategory === 'top100' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
      ]">
        {{ t('dictionary.top', { count: 100 }) }}
      </button>

      <button
      role="tab"
      :aria-selected="selectedCategory === 'top500'"
      @click="selectedCategory = 'top500'"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
        selectedCategory === 'top500' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
      ]">
        {{ t('dictionary.top', { count: 500 }) }}
      </button>

      <button
      role="tab"
      :aria-selected="selectedCategory === 'all'"
      @click="selectedCategory = 'all'"
      :class="[
        'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
        selectedCategory === 'all' ? 'bg-white text-aubergine shadow-xs' : 'text-gray-500 hover:text-aubergine'
      ]">
        {{ t('dictionary.alphebetical') }}
      </button>
  </nav>
</template>