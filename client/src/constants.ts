export const headerLinks = [
  {
    name: "Recipes",
    link: "recipes",
  },
  {
    name: "About Us",
    link: "about",
  },
  {
    name: "Library",
    link: "library",
  },
];

type SignInConstants = {
  name: "email" | "password";
  label: string;
  type: string;
}[];

export const SIGN_IN_INPUTS: SignInConstants = [
  {
    label: "Email",
    name: "email",
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

type SignUpConstants = {
  user: {
    label: string;
    name: "username" | "email" | "password";
    type: string;
  }[];
  nutrition: {
    label: string;
    name: "age" | "calories" | "intolerances";
    type: string;
    step?: number;
  }[];
};

export const SIGN_UP_INPUTS: SignUpConstants = {
  user: [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    ...SIGN_IN_INPUTS,
  ],
  nutrition: [
    {
      label: "Age",
      name: "age",
      type: "number",
      step: 1,
    },
    {
      label: "Average calorie intake",
      name: "calories",
      type: "number",
      step: 100,
    },
    {
      label: "Intolerances",
      name: "intolerances",
      // The type doesn't matter for this one since it needs MUI's Select component
      type: "select",
    },
  ],
};

export const INPUT_LIMITS = {
  age: {
    min: 16,
    max: 90,
  },
  calories: {
    min: 1200,
    max: 3500,
  },
};

export const FOOD_INTOLERANCES = [
  { name: "None", value: "None" },
  { name: "FODMAP", value: "FODMAP" },
  { name: "Gluten", value: "Gluten" },
  { name: "Shellfish", value: "Shellfish" },
  { name: "Soy", value: "Soy" },
  { name: "Sulfites", value: "Sulfites" },
  { name: "Tree Nuts", value: "Tree-Nuts" },
  { name: "Wheat", value: "Wheat" },
  // { name: "Eggs", value: "eggs" },
  // { name: "Milk", value: "Milk" },
  // { name: "Peanuts", value: "peanuts" },
  // { name: "Mustard", value: "mustard" },
  // { name: "Celery", value: "celery" },
  // { name: "Lupine", value: "lupine" },
  // { name: "Molluscs", value: "molluscs" },
  // { name: "Fish", value: "fish" },
  // { name: "Crustaceans", value: "crustaceans" },
  // { name: "Shellfish", value: "shellfish" },
];

// new Set([
//   "gluten free",
//   "dairy free",
//   "lacto ovo vegetarian",
//   "vegan",
//   "paleolithic",
//   "primal",
//   "whole 30",
//   "pescatarian",
//   "ketogenic",
//   "fodmap friendly"
// ])