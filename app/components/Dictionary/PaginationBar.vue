<script setup lang="ts">
const page = defineModel<number>({ required: true });
const { selectedCategory } = defineProps<{ selectedCategory: 'all' | 'top500' }>();

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
  <div class="flex items-center justify-between px-2 py-1">
    <span class="text-xs text-gray-400 font-medium">
      Sayfa: <span class="font-bold text-aubergine">{{ page }}</span> 
    </span>
    
    <div class="flex items-center gap-2">
      <UButton 
      variant="outline" 
      size="xs" 
      class="rounded-xl cursor-pointer h-8 text-xs px-3" 
      :disabled="page === 1"
      @click="prevPage">
        Önceki
      </UButton>

      <UButton 
      variant="outline" 
      size="xs" 
      class="rounded-xl cursor-pointer h-8 text-xs px-3"
      :disabled="selectedCategory === 'top500' && page >= 5"
      @click="nextPage">
        Sonraki
      </UButton>
    </div>
  </div>
</template>