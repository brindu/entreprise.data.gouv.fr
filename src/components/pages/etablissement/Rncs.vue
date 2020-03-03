<template>
  <section v-if="dataLoaded" class="section">
    <div class="container">
      <div class="company__buttons">
        <a
          class="button"
          :href="linkToPDF"
          title="Télécharger les données de cette entreprise au format PDF"
        >
          <img class="icon" src="@/assets/img/download.svg" alt="" />
          Version imprimable
        </a>
        <a
          class="button button__secondary"
          target="_blank"
          :href="linkToBodacc"
          title="Aller vers les annonces BODACC"
        >
          <img class="icon" src="@/assets/img/arrow_top_left.svg" alt="" />
          Annonces BODACC
        </a>
      </div>
      <company-identity />
      <div class="company__extra">
        <div class="notification grey">
          <div>
            Ces informations sont issues du RNCS mis à jour le {{ rncsLastUpdate }}.
          </div>
          <a
            class="button-outline secondary"
            target="_blank"
            :href="linkToJSON"
            title="Accéder aux données brutes de cette entreprise"
          >
            <img class="icon" src="@/assets/img/json.svg" alt="" />
            Accéder aux données JSON
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CompanyIdentity from "@/components/pages/etablissement/rncs/CompanyIdentity";

export default {
  name: 'Rncs',

  metaInfo() {
    return {
      title: `RNCS - ${this.siren}`
    }
  },

  props: { siren: String },

  data() {
    return {
      baseAddress: process.env.VUE_APP_FICHE_IDENTITE_RNCS,
      bodaccAddress: "https://www.bodacc.fr/annonce/liste/",
      dataLoaded: false
    }
  },

  computed: {
    ...mapGetters({
      rncsLastUpdate: "rncs/getLastUpdate"
    }),

    linkToPDF: function() {
      return `${this.baseAddress}${this.siren}/pdf`;
    },

    linkToJSON: function() {
      return `${this.baseAddress}${this.siren}`;
    },

    linkToBodacc() {
      return `${this.bodaccAddress}${this.siren}`;
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
  },

  components: {
    "company-identity": CompanyIdentity
  }
}
</script>

<style lang="scss" scoped>
.grey {
  background-color: $color-lightest-grey;
}

.button__secondary {
  background-color: $color-dark-grey !important;
  &:hover {
    background-color: $color-darker-grey !important;
  }
}

.notification {
  border-color: $color-grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .button-outline {
    flex-shrink: 0;
    margin-left: 1em;
  }
}

@media (max-width: $tablet) {
  .notification {
    flex-direction: column;

    .button-outline {
      margin-left: 0;
      margin-top: 1em;
    }
  }
}

.company__buttons > .button {
  min-width: 220px;
  min-height: 42px;
  margin-left: 10px;
  margin-right: 10px;
}

.company__extra {
  margin-top: 2em;
}
</style>
