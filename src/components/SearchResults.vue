<template>
  <ul>
    <li v-for="(etablissement, index) in getResults" :key="index">
      Raison sociale : {{ etablissement.nom_raison_sociale }}
    </li>
  </ul>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("search");

export default {
  name: 'SearchResults',

  computed: {
    ...mapGetters(["getResults"])
  }
}
</script>

<style lang="scss" scoped>
</style>
