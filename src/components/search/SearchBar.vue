<template>
  <div class="form__group">
    <input
      v-model="searchInput"
      type="text"
      name="searchInput"
      placeholder="Nom, SIREN, SIRET, adresse..."
      @keydown.enter="submit"
    />
    <search-bar-button v-on:submitSearch="submit"/>
  </div>
</template>

<script>
import SearchBarButton from "@/components/search/SearchBarButton";

export default {
  name: 'SearchBar',

  data () {
    return {
      searchInput: ""
    }
  },

  methods: {
    submit () {
      this.$router.push({ name: "search-results", query: { fullText: this.searchInput, page: 1 } });
    }
  },

  components: {
    'search-bar-button': SearchBarButton
  }
}
</script>

<style lang="scss" scoped>
.form__group {
  width: 35em;
  max-width: 100%;
}
</style>
