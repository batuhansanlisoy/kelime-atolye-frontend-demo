<script setup lang="ts">
const {
  theme,
  icon,
  title,
  text,
  textColor,
} = defineProps<{
  theme: string,
  icon: string,
  title: string,
  text: string,
  textColor: string,
}>();
</script>
<template>
  <div
  class="w-full p-4 rounded-2xl flex items-start gap-3 shadow-sm"
  :class="theme">

      <div
      class="text-xl mt-0.5"
      :class="textColor">
        <Icon :name="icon" />
      </div>

      <div class="space-y-1">

        <h2 class="text-sm font-bold text-lime-900">
          {{ title }}
        </h2>

        <p class="text-sm leading-relaxed" :class="textColor">
          {{ text }}
        </p>

      </div>

    </div>
</template>