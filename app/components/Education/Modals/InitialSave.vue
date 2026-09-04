<script setup lang="ts">
const { t } = useI18n();

const emit = defineEmits<{
  (e: 'close'): void
}>();
</script>

<template>
  <div class="p-6 text-center space-y-5 relative">

    <UButton
    icon="i-lucide-x"
    color="neutral"
    variant="ghost"
    size="sm"
    class="absolute top-4 right-4 rounded-full cursor-pointer"
    @click="emit('close')"/>

    <div class="mx-auto size-12 rounded-full bg-lime-50 flex items-center justify-center text-lime-600 shadow-sm animate-bounce">
      <UIcon name="i-lucide-trophy" class="size-6" />
    </div>

    <div class="space-y-2">
      <h3 class="text-xl font-black text-gray-700 tracking-tight">
        {{ t('education.modal.initial_save.title') }}
      </h3>
      <p class="text-sm text-gray-700 leading-relaxed px-2">
        {{ t('education.modal.initial_save.desc') }}
      </p>
    </div>

    <div class="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left space-y-3">
      <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {{ t('education.modal.initial_save.what_to_do') }}
      </div>

      <div class="flex items-start gap-3 text-sm text-gray-700">
        <UIcon name="material-symbols:check" class="size-5 text-lime-600 shrink-0 mt-0.5" />
        <span>{{ t('education.modal.initial_save.step1') }}</span>
      </div>

      <div class="flex items-start gap-3 text-sm text-gray-700">
        <UIcon name="material-symbols:check" class="size-5 text-lime-600 shrink-0 mt-0.5" />
        <span v-html="t('education.modal.initial_save.step2')"></span>
      </div>
      
      <div class="flex items-start gap-3 text-sm text-gray-700">
        <UIcon name="material-symbols:check" class="size-5 text-lime-600 shrink-0 mt-0.5" />
        <span v-html="t('education.modal.initial_save.step3')"></span>
      </div>

      <div class="flex items-start gap-3 text-sm text-gray-700">
        <UIcon name="material-symbols:check" class="size-5 text-lime-600 shrink-0 mt-0.5" />
        <span v-html="t('education.modal.initial_save.step4')"></span>
      </div>
    </div>
  </div>
</template>