<script setup lang="ts">
import { RouterView } from 'vue-router';

import Nav from './components/Nav.vue';

</script>

<template>

  <Nav />
  <RouterView />
</template>

<style lang="scss" scoped>
header {}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

#app {
  display: flex;
  flex-direction: column;

}



@media (min-width: 1024px) {


  .logo {
    margin: 0 2rem 0 0;
  }



}
</style>
