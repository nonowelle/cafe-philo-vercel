<script setup lang="ts">


import Section from '../components/Section.vue';

import Contact from '@/components/Contact.vue';

import { useLanguage } from '@/composables/useLanguage';

const { currentContent } = useLanguage();


</script>

<template>
  <main>

    <Section v-for="(section, index) in currentContent.sections" :key="index" :section="section"
      :id="section.sectionId" />


    <Contact />





  </main>
</template>

<style scoped>
.container {
  position: relative;

  width: 100%;
  display: flex;
  flex-wrap: wrap;
}



@media screen and (min-width: 785px) {
  main {
    flex-direction: row;
  }
}
</style>
