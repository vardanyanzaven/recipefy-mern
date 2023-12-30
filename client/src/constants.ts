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
      label: "Daily calorie intake",
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
    max: 90
  },
  calories: {
    min: 1200,
    max: 3500
  }
};

export const FOOD_INTOLERANCES = [
  { name: "None", value: "none" },
  { name: "Gluten", value: "gluten" },
  { name: "Dairy", value: "dairy" },
  { name: "Eggs", value: "eggs" },
  { name: "Soy", value: "soy" },
  { name: "Peanuts", value: "peanuts" },
  { name: "Tree nuts", value: "treeNuts" },
  { name: "Sesame", value: "sesame" },
  { name: "Mustard", value: "mustard" },
  { name: "Celery", value: "celery" },
  { name: "Sulfite", value: "sulfite" },
  { name: "Lupine", value: "lupine" },
  { name: "Molluscs", value: "molluscs" },
  { name: "Fish", value: "fish" },
  { name: "Crustaceans", value: "crustaceans" },
  { name: "Shellfish", value: "shellfish" },
  { name: "Wheat", value: "wheat" },
];

