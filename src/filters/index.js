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

Vue.filter("truncate", function(string) {
  if (string && string.length > 80) {
    return `${string.substring(0, 75)}...`;
  }
  return string;
});

Vue.filter("prettySiret", function(str) {
  if (!str) return null;
  // 11122233344444 => 111 222 333 444 44 => 111 222 333 44444.
  return str.replace(/(\d{3})/g, "$1 ").replace(/(\s)(?=(\d{2})$)/g, "");
});

Vue.filter("prettySirenHtml", function(str) {
  if (!str) return null;
  // 111222333 => 111 222 333 with &#8239 the NO-BREAK SPACE
  return str.replace(/(\d{3})(\d{3})(\d{3})/g, "$1&#8239;$2&#8239;$3");
});

Vue.filter("prettySiretHtml", function(str) {
  if (!str) return null;
  // 11122233344444 => 111 222 333 44444 with &#8239 the NO-BREAK SPACE
  return str.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/g, "$1&#8239;$2&#8239;$3&#8239;$4");
});

Vue.filter("placeHolderIfEmpty", function(str) {
  return (str && str !== "null") ? str : "Non renseigné";
});
