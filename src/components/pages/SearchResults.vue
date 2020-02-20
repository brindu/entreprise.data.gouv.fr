<template>
  <section class="section">
    <div class="container">
      <h4 v-if="results.length == 0">Aucun résultat trouvé.</h4>

      <ul v-else>
        <li v-for="(etablissement, index) in results" :key="index">
          <router-link
            class="panel"
            :to="{ name: 'Etablissement', params: { searchId: etablissement.siret } }"
          >
            <h4 class="title">
              {{ etablissement.nom_raison_sociale | capitalize | removeExtraChars }}
            </h4>
            <p>{{ etablissement.libelle_activite_principale_entreprise }}</p>
            <p>
              {{ etablissement.code_postal }}
              {{ etablissement.libelle_commune | capitalize }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
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
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 70vh;
}

.title {
  display: inline;
  margin: 0.15em;
}

.panel {
  display: block;
  text-decoration: none;
  color: $color-black;

  &:hover {
    border: 1px solid $color-light-blue;
  }
}

p {
  margin: 0.15em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 2em 0;

  li:hover {
    background-color: $color-lightest-grey;
  }
}

li + li {
  margin-top: 2em;
}
</style>
