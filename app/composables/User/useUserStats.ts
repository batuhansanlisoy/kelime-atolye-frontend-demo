import { useUserWordApi, type Stats } from '~/composables/api/user_word';

export function useUserStats() {
  const auth = useAuthStore();

  const { stats } = useUserWordApi();

  const {
    data: userStats,
    pending: userStatsPending,
    error: userStatsError,
    refresh: userStatsRefresh
  } = useAsyncData<Stats>(
    `user-${auth.user?.id}-word-stats`,
    async () => await stats()
  );

  // stats mistake değerine göre mistake kapatmam gerekiyor.
  const disabledSubModes = computed(() => {
    const disabled: string[] = [];

    const mistakedCount = userStats.value?.mistakedWordCount ?? 0;
    if (mistakedCount <= 10) {
      disabled.push('mistakes');
    }

    return disabled;
  });

  return {
    userStats,
    userStatsPending,
    userStatsError,
    userStatsRefresh,
    disabledSubModes
  };
}