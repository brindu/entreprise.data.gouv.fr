<template>
  <section class="section">
    <div class="container">
      <h4 v-if="results.length == 0">Aucun résultat trouvé.</h4>
      <ul v-else>
        <h3>{{ resultsNumber }} résultats pour "{{ fullText }}" dans la base SIRENE des entreprises</h3>
        <sirene-result v-for="(result, index) in results" :etablissement="result" :key="index" />
      </ul>
      <pagination v-on:goToPage="routeToPage" :currentPage="page" :pagesNumber="pagesNumber" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import SireneResult from "@/components/pages/search_results/SireneResult";
import Pagination from "@/components/pages/search_results/Pagination";

export default {
  name: 'SearchResultsList',

  props: {
    fullText: {
      type: String,
      default: ""
    },

    page: {
      type: Number,
      default: 1
    }
  },

  computed: {
    ...mapGetters({
      results: "search/getResults",
      resultsNumber: "search/getResultsNumber",
      pagesNumber: "search/getPagesNumber"
    })
  },

  created: function() { this.searchForResults(); },

  watch: {
    fullText: function() { this.searchForResults(); },
    page: function() { this.searchForResults(); }
  },

  methods: {
    searchForResults: function() {
      const args = { searchInput: this.fullText, pageNumber: this.page };
      this.$store.dispatch("search/fulltextSearch", args);
    },

    routeToPage: function(pageNumber) {
      this.$router.push({ name: "search-results", query: { fullText: this.fullText, page: pageNumber } });
    }
  },

  components: {
    "sirene-result": SireneResult,
    "pagination": Pagination
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
