<script setup lang="ts">
import { useTrainingData } from '~/composables/api/training';
import { useUserWordApi } from '~/composables/api/user_word';
import type { Training } from '~/types/training';
import type { CreateUserWordDTO } from '~/types/user_word';
import type { Word } from '~/types/word';
import { TRAINING_SUB_MODES } from '~/utils/training';

const emits = defineEmits<{
    (e: "initial-save"): void,
    (e: 'disable-sub-mode', value: string): void
}>();

const { subMode } = defineProps<{
  subMode: TrainingSubMode
}>();

const { t }      = useI18n();
const localePath = useLocalePath();
const auth       = useAuthStore();
const toast      = useToast();

const { list } = useTrainingData();
const { save } = useUserWordApi();

const {
  data: trainingWords,
  pending: trainingPending,
  refresh: trainingWordRefresh
} = useAsyncData<Training[]>(
  `user-${auth.user.id}-training-words`,
  () => list({ subMode: subMode }),
  {
    watch: [() => subMode]
  }
);

const currentIndex   = ref(0);
const selectedOption = ref<number | null>(null);
const correctCount   = ref(0);
const wrongCount     = ref(0);

const answersList = ref<CreateUserWordDTO[]>([]);

const currentWord = computed(() => {
  return trainingWords.value?.[currentIndex.value] || null;
});

const isFinished = computed(() => {
  if (!trainingWords.value || trainingWords.value.length === 0) return false;
  return currentIndex.value >= trainingWords.value.length;
});

async function submitAnswers() {
  try {
    // burda kaydediiyor yazısı için 1 saniye bekletiyorum.
    await Promise.all([
      save(answersList.value, subMode === 'initial' ? true : false),
      new Promise(resolve => setTimeout(resolve, 1000))
    ]);

    if (subMode === 'initial') {
      emits('initial-save');
      navigateTo(localePath({ name: 'education', query: { initialSave: 'true' } }));
    }
  } catch (error) {
      toast.add({
        title: t('error.save'),
        description: t('training.errors.save.desc'),
        icon: 'i-lucide-circle-alert',
        color: 'error'
      });
  } finally {
      currentIndex.value = 0;
      answersList.value = [];
      correctCount.value = 0;
      wrongCount.value = 0;
      trainingWordRefresh();
  }
}

function onSelect(answer: Word) {
  const isAnswerCorrect = answer.turkish === currentWord.value?.turkish;

  if (isAnswerCorrect) {
    correctCount.value++;
  } else {
    wrongCount.value++;
  }

  if (currentWord.value) {
    answersList.value.push({
      wordId: currentWord.value.id,
      correctCount: isAnswerCorrect ? 1 : 0,
      wrongCount: isAnswerCorrect ? 0 : 1,
    });
  }
}

watch(isFinished, (finished) => {
  if (finished) {
    submitAnswers();
  }
});

watch([trainingWords, () => subMode, trainingPending], ([words, subMode, pending]) => {
  currentIndex.value = 0;
  selectedOption.value = null;
  correctCount.value = 0;
  wrongCount.value = 0;
  answersList.value = [];

  // veri yüklenmeden yönlendirme yapmıyoruz
  if (pending) return;

  if (subMode === 'mistakes' && (!words || words.length < 10)) {
    toast.add({
      title: t('warning.router'),
      description: t('education.warning.routing.inadequate_mistake'),
      icon: 'i-lucide-triangle-alert',
      color: 'warning'
    });

    emits('disable-sub-mode', 'mistakes');
  }
}, { immediate: true });

onBeforeRouteLeave((to, from, next) => {
  if (answersList.value.length > 0 && !isFinished.value) {
    const answer = window.confirm("Antrenman devam ediyor, çıkmak istediğine emin misin? İlerlemeniz kaybolabilir.");
    
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});
</script>

<template>
  <div
  v-if="trainingWords"
  class="flex flex-col items-center gap-6 p-8 border border-gray-100 rounded-3xl shadow-sm w-full bg-white">

    <!-- Antreman Modu -->
    <TrainingInfo
    :theme="TRAINING_SUB_MODES[subMode].theme"
    :icon="TRAINING_SUB_MODES[subMode].icon"
    :title="t(TRAINING_SUB_MODES[subMode].title)"
    :text="t(TRAINING_SUB_MODES[subMode].text)"
    :text-color="TRAINING_SUB_MODES[subMode].textColor" />

    <!-- Progress Bar -->
    <TrainingProgressBar
    :training-words="trainingWords"
    :theme="TRAINING_SUB_MODES[subMode].theme2"
    v-model:current-index="currentIndex">
      <template v-if="subMode === 'initial'" #stats>
        <div class="flex justify-between gap-4">
          <span class="text-lime-600">
            {{ t('general.correct') }}: {{ correctCount }}
          </span>
  
          <span class="text-orange-600/90">
            {{ t('general.wrong') }}: {{ wrongCount }}
          </span>
        </div>
      </template>

      <template #info>
        <div class="text-xs text-teal-900">
          <div v-if="isFinished" class="flex items-center gap-2 text-teal-900 font-medium animate-pulse">
            <UIcon
            name="heroicons:arrow-path"
            class="size-4 animate-spin" />
            <span>
              {{ t('general.saving') }}
            </span>
          </div>

          <div v-else class="flex items-center gap-2 italic">
            <UIcon
            name="material-symbols:info-outline"
            class="size-4" />
            {{ t('training.progress_bar.saving_info', { word_count: trainingWords.length }) }}
            <!-- Test boyunca çözdüğünüz sorular 10'lu paketler halinde kaydedilir. Sayfadan erken çıkarsanız, en son tamamladığınız 10'lu grup kaydedilmiş olur. -->
          </div>
        </div>
      </template>
    </TrainingProgressBar>

    <!-- Sorulan kelime -->
    <TrainingTargetWord
    v-model:current-word="currentWord"
    :theme="TRAINING_SUB_MODES[subMode].theme"
    :text-color="TRAINING_SUB_MODES[subMode].textColor" />

    <!--Options-->
    <TrainingOptions
    v-model:current-index="currentIndex"
    v-model:current-word="currentWord"
    v-model:selected-option="selectedOption"
    @selected="(answer) => onSelect(answer)"/>

  </div>
</template>