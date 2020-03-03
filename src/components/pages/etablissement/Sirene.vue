<template>
  <section class="section">
    <div class="container">
      <div v-if="dataLoaded" class="company">
        <company-details />
        <etablissement-details />
      </div>
    </div>
  </section>
</template>

<script>
import CompanyDetails from "@/components/pages/etablissement/sirene/CompanyDetails.vue";
import EtablissementDetails from "@/components/pages/etablissement/sirene/EtablissementDetails.vue";

export default {
  name: 'SireneEtablissement',

  metaInfo() {
    return {
      title: `SIRENE - ${this.siret}`
    }
  },

  props: { siret: String },

  data() {
    return {
      dataLoaded: false
    }
  },

  watch: {
    id: function() { this.fetchAllDataForEtablissement() }
  },

  created() {
    this.fetchAllDataForEtablissement(this.siret);
  },

  methods: {
    fetchAllDataForEtablissement: function() {
      this.dataLoaded = false;
      this.$store.dispatch("sirene/fetchAllData", this.siret)
        .then(() => this.dataLoaded = true)
    }
  },

  components: {
    "company-details": CompanyDetails,
    "etablissement-details": EtablissementDetails
  }
}
</script>

<style lang="scss" scoped>
</style>
