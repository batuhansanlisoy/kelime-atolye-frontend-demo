<script setup lang="ts">
import { useUserScoreApi } from '~/composables/api/user_score';
import { useUserWordApi, type Stats } from '~/composables/api/user_word';
import { useUserStats } from '~/composables/User/useUserStats';
import type { UserScore } from '~/types/user_score';

const auth       = useAuthStore();
const toast      = useToast();
const route      = useRoute();
const localePath = useLocalePath();
const { t }      = useI18n();

const { getByUserId } = useUserScoreApi();

const query = route.query.initialSave as 'true';

//boolean olarak çeviriyoruz
const isModalOpen = ref(!!query);

const {
  data: userScore,
  error: userScoreError,
  refresh: userScoreRefresh
} = await useAsyncData<UserScore>(
  `user-${auth.user.id}-score`,
  () => getByUserId(),
);

const { stats } = useUserWordApi();

const {
  data: userStats,
  refresh: userStatsRefresh,
  pending: userStatsPending
} = useAsyncData<Stats>(
  `user-${auth.user?.id}-word-stats-index`,
  async () => await stats(),
);

const TrainingModes = computed(() => [
  {
    id: 1,
    subMode: 'reinforce',
    title: 'education.training.submode.reinforce',
    desc: 'education.training.submode.reinforce.desc',
    color: 'border-amber-50 bg-amber-50/30 hover:bg-amber-50 text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-700',
    navigation: {
      rule: (userStats.value?.totalWordCount ?? 0) >=30,
      toast: {
        title: 'warning.router',
        description: 'education.warning.routing.insufficient_pool',
        icon: 'i-lucide-triangle-alert',
        color: 'warning'
      }
    }
  },
  {
    id: 2,
    subMode: 'explore',
    title: 'education.training.submode.explore',
    desc: 'education.training.submode.explore.desc',
    color: 'border-green-50 bg-green-50/30 hover:bg-green-50 text-green-700',
    badgeBg: 'bg-green-100 text-green-700',
    navigation: {
      rule: true
    }
  },
  {
    id: 3,
    subMode: 'mistakes',
    title: 'education.training.submode.fail_dungeon',
    desc: 'education.training.submode.fail_dungeon.desc',
    color: 'border-rose-50 bg-rose-50/30 hover:bg-rose-50 text-rose-700',
    badgeBg: 'bg-rose-100 text-rose-700',
    navigation: {
      rule: (userStats.value?.mistakedWordCount ?? 0) >= 10,
      toast: {
        title: 'warning.router',
        description: 'education.warning.routing.inadequate_mistake',
        icon: 'i-lucide-triangle-alert',
        color: 'warning'
      }
    }
  }
]);

function navigateToTraining(mode: any) {
  if (!mode.navigation.rule) {
    toast.add({
      title: t(mode.navigation.toast.title),
      description: t(mode.navigation.toast.description),
      icon: mode.navigation.toast.icon,
      color: mode.navigation.toast.color
    });

    return;
  }

  navigateTo(localePath({ name: 'education-training', query: { subMode: mode.subMode } }))
}

onBeforeMount(() => {
  if (userScoreError.value !== null && !userScore.value) navigateTo(localePath('education-training'));
});
</script>

<template>
  <div class="flex flex-col gap-5 min-h-screen text-aubergine">

      <!-- Kullanıcı Bilgileri -->
      <UserInfo />

      <!-- İstatistik Kutuları -->
      <UserStats
      v-if="userStats"
      :user-stats="userStats" />

      <!-- Antreman Modları -->
      <div class="space-y-4">
        <h2 class="text-aubergine text-lg font-bold tracking-tight">
          {{ t('training.modes') }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div 
          v-for="mode in TrainingModes" 
          :key="mode.id"
          @click="navigateToTraining(mode)"
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

      <UModal
      v-model:open="isModalOpen"
      :ui="{ content: 'rounded-2xl' }">
        <template #content>
          <EducationModalsInitialSave 
          @close="isModalOpen = false" />
        </template>
      </UModal>

  </div>
</template>