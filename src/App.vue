<template>
  <div id="app">
    <app-header/>
    <div class="notification full-width">
      Ce site est un travail en cours, actuellement en beta. Vous pouvez le
      consulter librement.
    </div>
    <search-banner/>
    <router-view></router-view>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import SearchBanner from "@/components/search/SearchBanner";
import AppFooter from "@/components/layout/AppFooter";

export default {
  name: 'App',

  components: {
    'app-header': AppHeader,
    'search-banner': SearchBanner,
    'app-footer': AppFooter
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
