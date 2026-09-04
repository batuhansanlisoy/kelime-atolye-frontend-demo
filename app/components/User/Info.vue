<script setup lang="ts">
const { t } = useI18n();
const auth = useAuthStore();
const localePath = useLocalePath();

const avatarSrc = auth.user.gender === 'female' ? '/img/female.png': '/img/male.png'
</script>
<template>
  <header class="bg-white border-3 border-violet-50 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-4 w-full md:w-auto">
        <!-- Avatar / Seviye Rozeti -->
        <div class="relative flex items-center justify-center w-16 h-16 text-white font-black text-xl rounded-full">
          <NuxtImg
          :src="avatarSrc"
          alt="Avatar"
          class="h-16 w-auto object-contain rounded-full" />
        </div>
        
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-xl font-bold tracking-tight">
              {{ auth.user.fullname }}
            </h1>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto justify-end">
        <!-- Seri (Streak) -->
        <div class="flex items-center gap-2 px-5 py-2.5 card-gradient-red rounded-xl shadow-sm">
          <UIcon name="material-symbols:rocket-launch-rounded" class="text-red-500 size-6"/>

          <span class="font-bold text-red-500 text-sm">
            {{  t('education.streak_days', { count: auth.user.streak_count} ) }}
          </span>
        </div>

        <NuxtLink
        :to="localePath('education-training')"
        class="group relative inline-flex items-center gap-2 px-6 py-3 card-gradient-lime text-lime-600 font-bold rounded-xl text-sm shadow-sm  transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95">
        
          <span>
            {{ t('education.quick_start') }}
          </span>

          <!-- Aksiyon Hissi Veren İkon -->
          <UIcon name="material-symbols:arrow-forward-rounded" class="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </NuxtLink>
      </div>

    </header>
</template>
