<template>
  <div class="company__main">
    <div class="title__block">
      <h2>
        <div>{{ companyTitle | removeExtraChars | placeHolderIfEmpty }}</div>
        <span class="company__siren" :inner-html.prop="`(${uniteLegale.siren})` | prettySirenHtml" />
      </h2>

      <div class="subtitle">
        <div>{{ etablissement.geo_l4 }}</div>
        <div>{{ etablissement.geo_l5 }}</div>
      </div>

      <div class="company__panel">
        <p v-if="etablissement.etablissement_siege === 'true'" class="company__item">
          Cet établissement est le siège social.
        </p>
        <p v-else class="company__item">
          Le siège social de cette entreprise est&nbsp;:
          <router-link
            class="company__item-link"
            :to="{
              name: 'sirene-etablissement',
              params: { sirenOrSiret: uniteLegale.etablissement_siege.siret }
            }"
          >
            {{ uniteLegale.denomination | removeExtraChars }}
            <span :inner-html.prop="uniteLegale.etablissement_siege.siret | prettySiretHtml" />
          </router-link>
        </p>

        <p v-if="etablissement.etat_administratif === 'A'" class="is_open">
          Cet établissement est actuellement en activité.
        </p>
        <p v-else class="is_closed">
          Cet établissement est fermé.
        </p>
      </div>

      <div v-if="etablissementsNumber > 1" class="company__item">
        <div class="company__children-summary">
          Cette entreprise possède {{ etablissementsNumber }} établissements
          (ouverts ou fermés).

          <template v-if="etablissementsNumber > maxLinkToEtablissements">
            <div v-show="!showAll" class="company__item-link" @click="showAll = true">
              Afficher la totalité
            </div>
            <div v-show="showAll" class="company__item-link" @click="showAll = false">
              Réduire
            </div>
          </template>
        </div>

        <ul class="company__children">
          <li v-for="eta in etablissementsToShow" :key="eta.siret" class="company__item-link">
            <router-link :to="{ name: 'sirene-etablissement', params: { sirenOrSiret: eta.siret } }">
              {{ eta.siret | prettySiret }}
            </router-link>
          </li>
        </ul>
      </div>

      <div v-else class="company__item"> Cet établissement est le seul de cette entreprise.</div>

      <router-link :to="{ name: 'rncs', params: { siren: etablissement.siren } }">
        Fiche d'immatriculation au RNCS
      </router-link>

      <div class="timestamps">
          Dernière mise à jour SIRENE :&nbsp;{{ etablissement.updated_at | frenchDateFormat }}
      </div>
    </div>

    <mini-map />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Map from "@/components/pages/etablissement/sirene/Map.vue";

export default {
  name: "CompanyDetails",

  data() {
    return {
      showAll: false,
      maxLinkToEtablissements: 6
    }
  },

  computed: {
    ...mapGetters({
      etablissement: "sirene/getEtablissement",
      uniteLegale: "sirene/getUniteLegale",
      companyTitle: "sirene/getCompanyTitle"
    }),

    etablissementsNumber: function() {
      return this.uniteLegale.etablissements.length;
    },

    etablissementsToShow: function() {
      return this.showAll ? this.uniteLegale.etablissements : this.uniteLegale.etablissements.slice(0, this.maxLinkToEtablissements);
    }
  },

  components: {
    "mini-map": Map
  }
}
</script>

<style lang="scss" scoped>
.company__main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#map {
  margin-left: 2em;
}

@media (max-width: $desktop) {
  .company__main {
    flex-direction: column;
  }

  #map {
    margin-left: 0;
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

.company__panel {
  margin-top: 1.5em;
}

.company__item {
  margin-bottom: 1em;
}

.company__children-summary {
  margin-bottom: 0.5em;
}

.company__children {
  margin: 0;
  padding: 0;
}

.company__children li {
  display: inline-block;
  margin-right: 0.5em;
}

.is_open {
  color: $color-dark-green;
}

.is_closed {
  color: $color-red;
}

.timestamps {
  color: grey;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
