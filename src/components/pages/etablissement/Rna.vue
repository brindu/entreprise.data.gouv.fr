<template>
  <section class="section">
    <div class="container">
      <div class="company">
        <div class="company__main">
          <div class="title__block">
            <h2>
              {{ association.titre }}
              <span class="association__id">({{ association.id_association }})</span>
            </h2>

            <div class="second__subtitle">
              {{ association.titre_court }}
            </div>

            <div class="timestamps">
              <p>
                Dernière mise à jour RNA : {{ association.updated_at | frenchDateFormat }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RNAEtablissement",

  metaInfo() {
    return {
      title: `${this.association.titre} - Données du RNA`
    }
  },

  props: { assoId: String },

  data() {
    return {
      dataLoaded: false
    }
  },

  watch: {
    assoId: function() { this.fetchRnaData() }
  },

  created() {
    this.fetchRnaData();
  },

  computed: {
    ...mapGetters({
      association: "rna/getAssociation"
    })
  },

  methods: {
    fetchRnaData: function() {
      this.dataLoaded = false;
      this.$store.dispatch("rna/fetchData", this.assoId)
        .then(() => this.dataLoaded = true)
    }
  },
}
</script>

<style lang="scss" scoped>
.company__main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: $desktop) {
  .company__main {
    flex-direction: column;
  }
}

.company__buttons {
  margin-top: 1.5em;

  .button {
    padding: 0.5em 1em 0.6em;
    vertical-align: middle;
    margin-left: 0;
  }
}

h2 {
  margin: 0;
}

.subtitle {
  font-size: 1.25em;
}

.second__subtitle {
  margin-top: 0.5em;
}

.company__siren,
.second__subtitle {
  color: $color-darker-grey;
}

.map__dummy {
  height: 350px;
  width: 48%;
  background-color: #f2eae2;
}

.link__external {
  margin-top: 10px;
  display: inline-block;
}

.timestamps {
  color: grey;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.timestamps > p {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>
