<template>
  <div id="app">
    <app-header/>
    <search-bar/>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import SearchBar from "@/components/SearchBar";
import AppFooter from "@/components/AppFooter";

export default {
  name: 'App',

  components: {
    'app-header': AppHeader,
    'search-bar': SearchBar,
    'app-footer': AppFooter
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
