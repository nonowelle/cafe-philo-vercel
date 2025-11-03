import { ref, computed } from 'vue';
import { textContent } from '@/content/textContent';

const currentLanguage = ref<'en' | 'es'>('es');

export function useLanguage() {
  const setLanguage = (lang: 'en' | 'es') => {
    currentLanguage.value = lang;
  };

  const currentContent = computed(() => {
    return textContent[currentLanguage.value];
  });

  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'en' ? 'es' : 'en';
  };

  return {
    currentLanguage,
    currentContent,
    setLanguage,
    toggleLanguage
  };
}
