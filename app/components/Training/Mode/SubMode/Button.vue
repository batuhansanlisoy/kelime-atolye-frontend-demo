<script setup lang="ts">
import { TRAINING_SUB_MODES } from '~/utils/training';

const activeSubMode = defineModel<TrainingSubMode>();

const { subMode } = defineProps<{
  subMode: TrainingSubMode
}>();

const { t } = useI18n();

const setSubMode = (subMode: TrainingSubMode) => {
  activeSubMode.value = subMode
}
</script>

<template>
  <button 
  @click="setSubMode(subMode)"
  class="py-1.5 px-3 cursor-pointer transition rounded-lg hover:bg-gray-50"
  :class="activeSubMode === subMode ? 'bg-gray-50': 'bg-transparent'">

    <span 
    class="text-xs font-semibold"
    :class="activeSubMode === subMode ? TRAINING_SUB_MODES[subMode].activeColor : 'text-slate-600 hover:text-slate-600'">
      {{ t(TRAINING_SUB_MODES[subMode].label) }}
    </span>

  </button>
</template>