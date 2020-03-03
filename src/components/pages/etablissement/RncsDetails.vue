<template>
  <div>
    coucou
  </div>
</template>

<script>
export default {
  name: 'RncsDetails',

  metaInfo() {
    return {
      title: `RNCS - ${this.siren}`
    }
  },

  props: { siren: String },

  data() {
    return {
      dataLoaded: false
    }
  },

  watch: {
    siren: function() { this.fetchRncsData() }
  },

  created() {
    this.fetchRncsData();
  },

  methods: {
    fetchRncsData: function() {
      this.dataLoaded = false;
      this.$store.dispatch("rncs/fetchData", this.siren)
        .then(() => this.dataLoaded = true)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
