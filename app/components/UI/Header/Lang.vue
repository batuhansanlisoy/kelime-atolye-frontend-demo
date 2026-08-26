<script setup lang="ts">
const { locale, setLocale } = useI18n();

const route = useRoute();
const localePath = useLocalePath();

const isLangMenuOpen = ref(false);

const languageList = [
  { code: 'tr', name: 'Türkçe', flag: 'circle-flags:tr' },
  { code: 'en', name: 'English', flag: 'circle-flags:us' },
];

const currentFlag = computed(() => {
  const current = languageList.find(l => l.code === locale.value);
  return current ? current.flag : 'circle-flags:tr';
});
// burası [slug].vue tarafında dil değişiminde atıyorum tr iken ingilizce-en-cok-kullanilan-100-kelime burdayım
// en yaptıgım zaman bütün url en şeklinde oluyor ama english-most-used-100-words bunu yazmıyordu onun için yapıldı
// daha sonra adam edilecek burası
const changeLanguage = async (newLang: "tr" | "en") => {
  isLangMenuOpen.value = false;

  if (route.name?.toString().includes('dictionary-slug')) {
    const currentSlug = route.params.slug as string;
    let targetSlug = currentSlug;

    if (currentSlug.includes('100')) {
      targetSlug = newLang === 'en' ? 'english-most-used-100-words' : 'ingilizce-en-cok-kullanilan-100-kelime';
    } else if (currentSlug.includes('500')) {
      targetSlug = newLang === 'en' ? 'english-most-used-500-words' : 'ingilizce-en-cok-kullanilan-500-kelime';
    } else {
      // Harf dizinleri için (Örn: a harfi)
      const trMatch = currentSlug.match(/^ingilizce-([a-z])-ile-baslayan-kelimeler$/);
      const enMatch = currentSlug.match(/^english-words-starting-with-([a-z])$/);

      if (trMatch && newLang === 'en') {
        targetSlug = `english-words-starting-with-${trMatch[1]}`;
      } else if (enMatch && newLang === 'tr') {
        targetSlug = `ingilizce-${enMatch[1]}-ile-baslayan-kelimeler`;
      }
    }

    await setLocale(newLang);
    navigateTo(localePath({ name: 'dictionary-slug', params: { slug: targetSlug } }));
  } else {
    setLocale(newLang);
  }
};

const closeDropdown = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.lang-container')) {
    isLangMenuOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));
</script>

<template>
  <div class="relative lang-container">
    <button
    @click="isLangMenuOpen = !isLangMenuOpen;"
    class="lang-btn">
      <UIcon :name="currentFlag" class="size-4 rounded-full" />
      <span class="uppercase">
        {{ locale }}
      </span>
      <UIcon name="lucide:chevron-down" class="size-3 text-gray-400" />
    </button>

    <!-- Dil Menüsü Dropdown -->
    <transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0">
      <div 
      v-if="isLangMenuOpen" 
      class="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 flex flex-col gap-1">
        <button
        v-for="lang in languageList"
        :key="lang.code"
        @click="changeLanguage(lang.code as 'tr' | 'en')"
        class="lang-dropdown-btn"
        :class="{ 'bg-blue-50/50 text-blue-600 font-semibold': locale === lang.code }">
          <UIcon :name="lang.flag" class="size-4 rounded-full" />
          <span>
            {{ lang.name }}
          </span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";
.lang-btn {
  @apply flex items-center gap-2 px-3 py-4 rounded-xl text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer
}

.lang-dropdown-btn {
  @apply flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors w-full text-left cursor-pointer
}
</style>