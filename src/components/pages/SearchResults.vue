<template>
  <ul>
    <li v-for="(etablissement, index) in results" :key="index">
      Raison sociale : {{ etablissement.nom_raison_sociale }}
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchResults',

  props: {
    fullText: {
      type: String,
      default: ""
    }
  },

  created: function() { this.searchForResults(); },

  watch: {
    fullText: function() { this.searchForResults(); }
  },

  methods: {
    searchForResults: function() {
      this.$store.dispatch("search/fulltextSearch", this.fullText);
    }
  },

  computed: {
    ...mapGetters({ results: "search/getResults" })
  }
}
</script>

<style lang="scss" scoped>
</style>
