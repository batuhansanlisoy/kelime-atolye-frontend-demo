<script setup lang="ts">
const { isAuthenticated = false } = defineProps<{ isAuthenticated: boolean }>();

const { locale, t } = useI18n();
const localePath = useLocalePath();

const navLinks = [
  {
    name: 'education',
    path: 'education',
    icon: 'material-symbols:school-rounded'
  },
  {
    name: 'training',
    path: 'education-training',
    icon: 'material-symbols:fitness-center-rounded'
  },
];

const isDictionaryOpen = ref(false);
const isLangMenuOpen = ref(false);

const currentSlugs = computed(() => {
  const lang = locale.value as 'tr' | 'en';
  
  return {
    top100: lang === 'en' ? 'english-most-used-100-words' : 'ingilizce-en-cok-kullanilan-100-kelime',
    top500: lang === 'en' ? 'english-most-used-500-words' : 'ingilizce-en-cok-kullanilan-500-kelime',
  };
});

// A'dan Z'ye harfleri otomatik üretiyoruz
const alphabetLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const getAlphabetSlug = (letter: string) => {
  const lang = locale.value as 'tr' | 'en';
  const lowerLetter = letter.toLowerCase();
  
  return lang === 'en' 
    ? `english-words-starting-with-${lowerLetter}` 
    : `ingilizce-${lowerLetter}-ile-baslayan-kelimeler`;
};

const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.dropdown-container')) {
    isDictionaryOpen.value = false;
    isLangMenuOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));
</script>

<template>
  <nav class="hidden md:flex items-center gap-2">
    <NuxtLink
    v-if="isAuthenticated"
    v-for="link in navLinks" 
    :key="link.path"
    :to="localePath(link.path)"
    active-class="bg-gray-100 text-blue-600 font-semibold"
    class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
      <UIcon :name="link.icon" class="size-4" />

      <span>
        {{ t(link.name) }}
      </span>
    </NuxtLink>

    <!-- Açılır Menu -->
    <div class="relative dropdown-container">
      <button
      @click="isDictionaryOpen = !isDictionaryOpen; isLangMenuOpen = false"
      class="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer">
        <UIcon name="material-symbols:book-2-rounded" class="size-4" />

        <span>
          {{ t('dictionary') }}
        </span>
        
        <UIcon 
        name="lucide:chevron-down" 
        class="size-3.5 text-gray-400 transition-transform duration-200" 
        :class="{ 'rotate-180': isDictionaryOpen }" />
      </button>

      <!-- Açılır Pencere (Dropdown Content) -->
      <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0">
        <div 
        v-if="isDictionaryOpen" 
        class="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 flex flex-col gap-1">
          
          <NuxtLink
          :to="localePath({ name: 'dictionary-slug', params: { slug: currentSlugs.top100 } })"
          @click="isDictionaryOpen = false"
          class="link">
            <UIcon name="material-symbols:star-rounded" class="size-4 text-amber-500" />
            <span>
              {{ t('english_top_100') }}
            </span>
          </NuxtLink>

          <NuxtLink
          :to="localePath({ name: 'dictionary-slug', params: { slug: currentSlugs.top500 } })"
          @click="isDictionaryOpen = false"
          class="link">
            <UIcon name="material-symbols:local-fire-department-rounded" class="size-4 text-orange-500" />
            <span>
              {{ t('english_top_500') }}
            </span>
          </NuxtLink>

          <div class="h-px bg-gray-100 my-1 mx-2"></div>

          <!-- Yana Açılan Harf Dizini Grubu -->
          <div class="relative group/sub">
            <div class="link cursor-pointer justify-between">
              <div class="flex items-center gap-3">
                <UIcon name="material-symbols:sort-by-alpha-rounded" class="size-4 text-blue-500" />
                <span>
                  {{ t('A-Z_index') }}
                </span>
              </div>

              <UIcon name="lucide:chevron-right" class="size-3.5 text-gray-400" />
            </div>

            <!-- Yana Açılan 4-Sütunlu Harf Kutusu (Flyout) -->
            <div class="absolute left-full top-0 ml-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
              <div class="grid grid-cols-4 gap-1.5">
                <NuxtLink
                v-for="letter in alphabetLetters"
                :key="letter"
                :to="localePath({ name: 'dictionary-slug', params: { slug: getAlphabetSlug(letter) } })"
                @click="isDictionaryOpen = false"
                class="flex items-center justify-center h-8 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-sky-500 rounded-lg transition-colors">
                  {{ letter }}
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>
      </transition>

    </div>

  </nav>
</template>

<style scoped>
@reference "@/assets/css/main.css";
.link {
  @apply flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-500 transition-colors;
}
</style>