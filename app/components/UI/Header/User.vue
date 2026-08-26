<script setup lang="ts">
const auth = useAuthStore();

const avatarSrc = auth.user.gender === 'female' ? '/img/female.png': '/img/male.png'
</script>
<template>
    <UPopover>
      <UButton
      class="gap-3 p-2 rounded-2xl bg-gray-50 text-aubergine hover:bg-gray-200 font-semibold text-base">
        <div class="w-9 h-9 rounded-full">
          <NuxtImg
          :src="avatarSrc"
          alt="Avatar"
          class="h-9 w-auto object-contain rounded-full" />
        </div>

        <span>{{ auth.user.fullname }}</span>

        <UIcon name="lucide:chevron-down" class="size-5" />
        
      </UButton>

      <template #content>

        <div class="flex flex-col p-2 w-48 text-aubergine text-base">

          <button
          class="flex justify-center items-center gap-4 font-semibold cursor-pointer"
          @click="auth.logout">
            <UIcon name="lucide:log-out" class="size-5" />

            <span>
              Çıkış Yap
            </span>
          </button>
  
        </div>

      </template>
    </UPopover>
</template>