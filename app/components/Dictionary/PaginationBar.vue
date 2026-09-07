<script setup lang="ts">
const page = defineModel<number>({ required: true });
const { selectedCategory } = defineProps<{ selectedCategory: 'all' | 'top500' }>();

const { t } = useI18n();

const nextPage = () => {
  page.value++;
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};
</script>

<template>
  <nav role="navigation" aria-label="Pagination" class="flex items-center justify-between px-2 py-1">
    <span class="text-xs text-gray-400 font-medium">
      {{ t('general.page') }}: <span class="font-bold text-aubergine">{{ page }}</span> 
    </span>
    
    <div class="flex items-center gap-2">
      <UButton 
      variant="outline" 
      size="xs" 
      class="rounded-xl cursor-pointer h-8 text-xs px-3" 
      :disabled="page === 1"
      :aria-label="t('general.prev')"
      @click="prevPage">
        {{ t('general.prev') }}
      </UButton>

      <UButton 
      variant="outline" 
      size="xs"
      class="rounded-xl cursor-pointer h-8 text-xs px-3"
      :disabled="selectedCategory === 'top500' && page >= 5"
      :aria-label="t('general.next')"
      @click="nextPage">
        {{ t('general.next') }}
      </UButton>
    </div>
  </nav>
</template>