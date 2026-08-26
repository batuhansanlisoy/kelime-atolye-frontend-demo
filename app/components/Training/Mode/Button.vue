<script setup lang="ts">
import { TRAINING_MODES, type TrainingMode } from '~/utils/training';

const activeMode = defineModel<TrainingMode>();

const { mode } = defineProps<{
  mode: TrainingMode
}>();

const { t } = useI18n();

function setMode(mode: TrainingMode) {
  activeMode.value = mode;
}
</script>

<template>
  <button
  @click="setMode(mode)"
  class="relative flex items-center gap-2.5 py-2 px-4 cursor-pointer rounded-xl transition hover:bg-gray-50">

    <UIcon
    :name="TRAINING_MODES[mode].icon"
    :class="['size-5 transition-colors', activeMode === mode ? 'text-orange-400' : 'text-gray-600']"/>

    <span
    :class="['font-semibold text-sm transition-colors', activeMode === mode ? 'text-gray-800' : 'text-gray-700']">
      {{ t(TRAINING_MODES[mode].label) }}
    </span>

    <div
    v-if="activeMode === mode"
    class="absolute -bottom-3.25 left-0 w-full h-0.5 bg-orange-400" />
  </button>
</template>