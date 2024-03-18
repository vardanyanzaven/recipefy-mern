# Recipefy

Recipefy is a MERN Application where users can browse, view and save a wide range of food recipes.

## Key features

* User Authentication via [MongoDB](https://www.mongodb.com/) and [JSON Web Tokens](https://jwt.io/)
* Information about recipes including the recipes' _ingredients_, _instructions_, _diets_ and _calorie count_, as well as references to the _original source_.

> [!NOTE]
> This project isn't finished. More exciting features are going to be added soon!

## How to run Recipefy locally

Take the following steps set up the project locally.

1. Clone the repo;
2. Run `npm run install-all`;
3. Create a .env file in the **root** directory and add the [root variables](https://send.bitwarden.com/#o-0ELh7iX0SA5bEEANTFpg/Kr73JPY4Onast1eF21orTQ);
4. Create a .env file in the **server** directory and add the *server variables* from the link above;
5. Run `npm start`;
> [!IMPORTANT]
> Make sure that the .env file is in the server directory. Otherwise, the application isn't going to work.

And you're all set!