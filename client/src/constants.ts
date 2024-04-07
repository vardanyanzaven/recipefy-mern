export const BASE_API_URL = process.env.NODE_ENV === "production" ? "api" : "https://localhost:8000/api";

export const HEADER_LINKS = [
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
    name: "age" | "calories" | "diets";
    type?: string;
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
      label: "Daily number of meals",
      // Each option will have a fixed number of calories
      name: "calories",
    },
    {
      label: "Diets",
      name: "diets",
    },
  ],
};

export const INPUT_LIMITS = {
  age: {
    min: 16,
    max: 90,
  },
};

export const MEAL_COUNT_OPTIONS = [
  {
    name: "2-3 meals",
    calories: 700,
  },
  {
    name: "4 or more",
    calories: 500,
  },
];

export const FOOD_DIETS = [
  { name: "None", value: "none" },
  { name: "Dairy Free", value: "dairy free" },
  { name: "FODMAP Friendly", value: "fodmap friendly" },
  { name: "Gluten Free", value: "gluten free" },
  { name: "Ketogenic", value: "ketogenic" },
  { name: "Lacto Ovo Vegetarian", value: "lacto ovo vegetarian" },
  { name: "Paleolithic", value: "paleolithic" },
  { name: "Pescatarian", value: "pescatarian" },
  { name: "Primal", value: "primal" },
  { name: "Vegan", value: "vegan" },
  { name: "Whole 30", value: "whole 30" },
];
