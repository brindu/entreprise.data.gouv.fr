import capitalize from "lodash/capitalize";

import Vue from "vue";

Vue.filter("removeExtraChars", function(str) {
  if (!str) return;

  return str
    .replace(/\*/g, " ")
    .replace(/\//g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s$/, "");
});

Vue.filter("capitalize", capitalize);
