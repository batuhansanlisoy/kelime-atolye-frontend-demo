<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const TrainingModes = [
  { 
    id: 1,
    subMode: 'reinforce',
    title: 'education.training.submode.reinforce',
    desc: 'education.training.submode.reinforce.desc',
    color: 'border-amber-50 bg-amber-50/30 hover:bg-amber-50 text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-700'
  },
  { 
    id: 2,
    subMode: 'explore',
    title: 'education.training.submode.explore',
    desc: 'education.training.submode.explore.desc',
    color: 'border-green-50 bg-green-50/30 hover:bg-green-50 text-green-700',
    badgeBg: 'bg-green-100 text-green-700'
  },
  { 
    id: 3,
    subMode: 'mistakes',
    title: 'education.training.submode.fail_dungeon',
    desc: 'education.training.submode.fail_dungeon.desc',
    color: 'border-rose-50 bg-rose-50/30 hover:bg-rose-50 text-rose-700',
    badgeBg: 'bg-rose-100 text-rose-700'
  },
]
</script>

<template>
  <div class="flex flex-col gap-5 min-h-screen text-aubergine">
    <!-- <div class="max-w-6xl mx-auto space-y-8"> -->
      
      <!-- Kullanıcı Bilgileri -->
      <UserInfo />

      <!-- İstatistik Kutuları -->
      <UserStats />

      <!-- Antreman Modları -->
      <div class="space-y-4">
        <h2 class="text-aubergine text-lg font-bold tracking-tight">
          {{ t('training.modes') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
          v-for="mode in TrainingModes" 
          :key="mode.id"
          @click="navigateTo(localePath({ name: 'education-training', query: { subMode: mode.subMode } }))"
          :class="mode.color"
          class="p-5 rounded-2xl border-3 transition-all cursor-pointer shadow-md flex flex-col justify-between space-y-4 group">

            <div class="flex items-center justify-between">
              <h3 class="font-bold text-base group-hover:translate-x-1 transition-transform">
                {{ t(mode.title) }}
              </h3>
            </div>
            
            <p class="text-xs opacity-80 tracking-wide leading-relaxed">
              {{ t(mode.desc) }}
            </p>

            <div class="flex items-center justify-between pt-2 border-t border-black/5 text-xs font-semibold">
              <span>
                {{ t('general.quick_start') }}
              </span>

              <UIcon
              name="material-symbols:arrow-forward-rounded"
              class="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </div>

          </div>
        </div>
      </div>

    <!-- </div> -->
  </div>
</template>