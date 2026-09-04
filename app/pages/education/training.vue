<script setup lang="ts">
import { useUserScoreApi } from '~/composables/api/user_score';
import { useUserStats } from '~/composables/User/useUserStats';
import type { UserScore } from '~/types/user_score';

const auth  = useAuthStore();
const route = useRoute();

const { getByUserId } = useUserScoreApi();

const {
  data: userScore,
  error: userScoreError,
  refresh: userScoreRefresh
} = await useAsyncData<UserScore>(
  `user-${auth.user.id}-score`,
  () => getByUserId(),
);

const { disabledSubModes } = useUserStats();

const activeMode = ref<TrainingMode>('choice');

const querySubMode  = route.query.subMode as TrainingSubMode;
const activeSubMode = ref<TrainingSubMode>(querySubMode || 'standard');

// kullanıcının skoru üzerinden true false yapıyorum
// sebebi user words tablosunda herhangi bir kayıdı var mı
// var ise ayrı işlem yoksa ayrı işlemler yapacağız
const isInitial = computed(() => {
  return userScoreError.value !== null && !userScore.value;
});

async function onInitialSave() {
  activeSubMode.value = 'standard';
  await userScoreRefresh();
}

// mistakes antrenmanında atıyorum 20 tane hatalı kelimesi var üst üste 5 kere antreman yaptı kelime sayısı azalacak
// 10 taneden daha azsa artık antrenman yapamamsı lazım o alt modda o yüzden standarda yollayıp disabled arrayine eklemeliyiz
function onDisableSubMode (value: string) {
  if (value !== 'standard') {
    disabledSubModes.value.push(value);
    activeSubMode.value = 'standard';
  }
}

watch(isInitial, (newVal) => {
  if (newVal && !route.query.subMode) {
    activeSubMode.value = 'initial';
  }
},{ immediate: true });
</script>

<template>
    <div class="min-h-[80vh] flex flex-col gap-4 justify-center items-center">
      <TrainingMode
      v-if="!isInitial"
      v-model:active-mode="activeMode"
      v-model:active-sub-mode="activeSubMode"
      :disabled-sub-modes="disabledSubModes" />

      <TrainingModeChoosing
      :subMode="activeSubMode"
      @initial-save="onInitialSave"
      @disable-sub-mode="onDisableSubMode"/>

      <!-- <TrainingModeTyping /> -->
    </div>
</template>