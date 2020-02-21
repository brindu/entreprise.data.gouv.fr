<template>
  <section class="section">
    <div class="container">
      <h4 v-if="results.length == 0">Aucun résultat trouvé.</h4>
      <ul v-else>
        <sirene-result v-for="(result, index) in results" :etablissement="result" :key="index" />
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SireneResult from "@/components/pages/search_results/SireneResult";

export default {
  name: 'SearchResults',

  props: {
    fullText: {
      type: String,
      default: ""
    }
  },

  computed: {
    ...mapGetters({ results: "search/getResults" })
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

  components: {
    "sirene-result": SireneResult
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 70vh;
}

ul {
  list-style: none;
  padding: 0;
  margin: 2em 0;
}
</style>
