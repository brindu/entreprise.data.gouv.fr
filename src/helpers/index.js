import capitalize from "lodash/capitalize";
import toUpper from "lodash/toUpper";

function concatNames(firstName, lastName) {
  const last = toUpper(lastName);
  const first = capitalize(firstName);

  if (first !== "" && last !== "") return `${first} ${last}`;
  else return last;
}

export {
  concatNames
};
