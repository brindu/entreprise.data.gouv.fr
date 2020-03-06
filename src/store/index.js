import "es6-promise/auto";

import Vue from "vue";
import Vuex from "vuex";

import search from "./search";
import sirene from "./sirene";
import rna from "./rna";
import rncs from "./rncs";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    search,
    sirene,
    rna,
    rncs
  }
});
