import { UseFormSetValue } from "react-hook-form";
import { SignUpData } from "../validation/auth.schema";

const setIntolerances = (
  newValue: string[],
  setValue: UseFormSetValue<SignUpData>
) => {
  // If an intolerance is selected the first time, remove "none" from the list
  if (newValue.at(0) === "none") {
    setValue(
      "intolerances",
      newValue.filter((item) => item !== "none")
      );
  }

  // If "none" is selected when there are selected intolerances, set intolerances to "none"
  else if (newValue.at(-1) === "none") {
    setValue("intolerances", ["none"]);
  }

  // If all options are deselected, select "none"
  else if (newValue.length === 0) {
    setValue("intolerances", ["none"]);
  }

  // Otherwise, just set the new value
  else {
    setValue("intolerances", newValue);
  }
};

export default setIntolerances;