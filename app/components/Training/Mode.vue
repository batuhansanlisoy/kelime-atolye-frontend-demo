<script setup lang="ts">
import type { TrainingSubMode, TrainingMode } from '~/utils/training';

const activeMode    = defineModel<TrainingMode>('activeMode', { required: true });
const activeSubMode = defineModel<TrainingSubMode>('activeSubMode', { required: true });

const { t } = useI18n();

const isEnToTr = ref(true)

// Fonksiyonlar
const toggleDirection = () => {
  isEnToTr.value = !isEnToTr.value
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full rounded-2xl bg-white p-4 shadow-sm border border-gray-100">

    <!-- Üst Satır: Ana Modlar ve Dil Yönü -->
    <div class="flex items-center justify-between w-full pb-3 border-b border-gray-100">

      <!-- Sol Taraf: Modlar -->
      <div class="flex items-center gap-1">
        <!-- Seçenekli Mod Butonu -->
        <TrainingModeButton
        v-model="activeMode"
        mode="choice"/>

        <TrainingModeButton
        v-model="activeMode"
        mode="typing"/>

        <TrainingModeButton
        v-model="activeMode"
        mode="voice"/>
      </div>

      <!-- Antreman Dili -->
      <button
      @click="toggleDirection"
      class="flex items-center gap-2 py-2 px-3.5 bg-gray-50/80 hover:bg-gray-100 cursor-pointer rounded-xl border border-gray-100 transition">
        <span class="text-gray-700 font-semibold text-xs">
          {{ isEnToTr ? t('lang.en') : t('lang.tr') }}
        </span>
        <UIcon name="material-symbols:swap-horiz" class="size-4 text-gray-600"></UIcon>
        <span class="text-gray-700 font-semibold text-xs">
          {{ isEnToTr ? t('lang.tr') : t('lang.en') }}
        </span>
      </button>

    </div>

    <!-- Alt Seçenekler -->
    <div class="flex items-center gap-2 pt-2">
      <div class="flex items-center gap-1">

        <TrainingModeSubModeButton
        v-model="activeSubMode"
        subMode="standard" />

        <TrainingModeSubModeButton
        v-model="activeSubMode"
        subMode="explore" />

        <TrainingModeSubModeButton
        v-model="activeSubMode"
        subMode="mistakes" />

        <TrainingModeSubModeButton
        v-model="activeSubMode"
        subMode="reinforce" />

      </div>
    </div>

  </div>
</template>