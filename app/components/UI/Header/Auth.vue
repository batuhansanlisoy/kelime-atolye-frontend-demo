<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div class="flex items-center gap-2">
    <NuxtLink
    :to="localePath('login')"
    class="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-700 transition-colors">
      Giriş Yap
    </NuxtLink>

    <NuxtLink
    :to="localePath('register')"
    class="px-4 py-2 text-sm font-semibold text-white bg-linear-to-r from-teal-400 to-teal-500 hover:bg-emerald-800 rounded-xl transition-colors">
      Kayıt Ol
    </NuxtLink>
  </div>
</template>