import { UseFormSetValue } from "react-hook-form";
import { SignUpData } from "../validation/auth.schema";

const setIntolerances = (
  newValue: string[],
  setValue: UseFormSetValue<SignUpData>
) => {
  // If an intolerance is selected the first time, remove "None" from the list
  if (newValue.at(0) === "None") {
    setValue(
      "intolerances",
      newValue.filter((item) => item !== "None")
      );
  }

  // If "None" is selected when there are selected intolerances, set intolerances to "none"
  else if (newValue.at(-1) === "None") {
    setValue("intolerances", ["None"]);
  }

  // If all options are deselected, select "None"
  else if (newValue.length === 0) {
    setValue("intolerances", ["None"]);
  }

  // Otherwise, just set the new value
  else {
    setValue("intolerances", newValue);
  }
};

export default setIntolerances;