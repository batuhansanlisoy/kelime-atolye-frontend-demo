<script setup lang="ts">
const auth = useAuthStore();
const localePath = useLocalePath();

const isAuthenticated = computed(() => !!auth.token);
</script>

<template>
  <div class="border-b-2 border-b-gray-200 bg-white">
    <div class="flex items-center justify-between gap-6 w-full mx-auto max-w-6xl py-2">
      
      <!-- Sol Taraf -->
      <div class="flex items-center gap-8">
        <!--Logo-->
        <NuxtLink
        :to="localePath('/')"
        class="flex items-center cursor-pointer">
          <NuxtImg
          src="/img/logo.png"
          alt="Kelime Atölye Logo"
          class="h-16 w-auto object-contain" />
        </NuxtLink>

        <!--Menu-->
        <UIHeaderNav
        :is-authenticated="isAuthenticated"/>
      </div>

      <!-- Rigth Side -->
      <div class="flex items-center gap-3">
        <!--Lang Switcher-->
        <UIHeaderLang />
        <!-- User -->
        <UIHeaderUser v-if="isAuthenticated" />
        <UIHeaderAuth v-if="!isAuthenticated"/>
      </div>

    </div>
  </div>
</template>