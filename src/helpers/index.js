import capitalize from "lodash/capitalize";
import toUpper from "lodash/toUpper";
import { libellesCodesNaf } from "@/fixtures/codes_naf";
import { libellesCategoriesJuridiques } from "@/fixtures/categories_juridiques";

function concatNames(firstName, lastName) {
  const last = toUpper(lastName);
  const first = capitalize(firstName);

  if (first !== "" && last !== "") return `${first} ${last}`;
  else return last;
}

function placeHolderIfEmpty(str) {
  return (str && str !== "null") ? str : "Non renseigné";
}

function libelleFromCodeNaf(codeNaf) {
  const formattedNaf = codeNaf.replace(/[.-]/g, "");
  return libellesCodesNaf[formattedNaf];
}
function libelleFromCategoriesJuridiques(categorie) {
  return libellesCategoriesJuridiques[categorie];
}

// convert a date into the DD/MM/YYYY format
function frenchDateFormat(date) {
  return (date == null) ? null : new Intl.DateTimeFormat("en-GB").format(new Date(date));
}

function formatAddressZone(codePostal, ville, pays) {
  const zone = `${toUpper(codePostal)} ${capitalize(ville)}, ${toUpper(pays)}`;
  const trim = new RegExp(/^, ?| ,| ?,$/g);
  return zone.trim().replace(trim, "");
}

export {
  concatNames,
  frenchDateFormat,
  formatAddressZone,
  placeHolderIfEmpty,
  libelleFromCodeNaf,
  libelleFromCategoriesJuridiques
};
