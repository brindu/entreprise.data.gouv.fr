import capitalize from "lodash/capitalize";
import toUpper from "lodash/toUpper";

function concatNames(firstName, lastName) {
  const last = toUpper(lastName);
  const first = capitalize(firstName);

  if (first !== "" && last !== "") return `${first} ${last}`;
  else return last;
}

function placeHolderIfEmpty(str) {
  return (str && str !== "null") ? str : "Non renseigné";
}

export {
  concatNames,
  placeHolderIfEmpty
};
