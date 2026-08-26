<script setup lang="ts">
import { useTrainingData } from '~/composables/api/training';
import { useUserWordApi } from '~/composables/api/user_word';
import type { Training } from '~/types/training';
import type { CreateUserWordDTO } from '~/types/user_word';
import type { Word } from '~/types/word';
import { TRAINING_SUB_MODES } from '~/utils/training';

const emits = defineEmits<{
    (e: "initial-save"): void
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

const { data: trainingWords, refresh: trainingWordRefresh } = useAsyncData<Training[]>(
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
      await save(answersList.value);

      if (subMode === 'initial') {
        emits('initial-save');
        navigateTo(localePath('education'));
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
</script>

<template>
  <div
  v-if="currentWord && trainingWords"
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
    v-if="subMode == 'initial'"
    :training-words="trainingWords"
    v-model:current-index="currentIndex"
    v-model:correct-count="correctCount"
    v-model:wrong-count="wrongCount">
      <template #stats>
        <div class="flex justify-between gap-4">
          <span class="text-lime-600">
            {{ t('general.correct') }}: {{ correctCount }}
          </span>
  
          <span class="text-orange-600/90">
            {{ t('general.wrong') }}: {{ wrongCount }}
          </span>
        </div>
      </template>
    </TrainingProgressBar>

    <!-- Sorulan kelime -->
    <TrainingTargetWord
    v-model:current-word="currentWord" />

    <!--Options-->
    <TrainingOptions
    v-model:current-index="currentIndex"
    v-model:current-word="currentWord"
    v-model:selected-option="selectedOption"
    @selected="(answer) => onSelect(answer)"/>

  </div>
</template>