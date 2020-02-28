<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SireneEtablissement',

  metaInfo() {
    return {
      title: `SIRENE - ${this.id}`
    }
  },

  props: { id: String },

  computed: {
    ...mapGetters({
      etablissement: "sirene/getEtablissement"
    })
  },

  created() {
    this.$store.dispatch("sirene/fetchAllData", this.id)
      .then(() => console.log("got both data"))
  }
}
</script>

<style lang="scss" scoped>
</style>
