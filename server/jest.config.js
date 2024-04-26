module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    dotenv: require("dotenv").config({ path: "../.env" }),
  },
};
