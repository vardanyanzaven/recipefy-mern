# Recipefy

Recipefy is a MERN Application where users can view and find information about a wide range of food recipes.

## Key features

* User Authentication via [MongoDB](https://www.mongodb.com/) and [JSON Web Tokens](https://jwt.io/)
* Information about recipes including the recipes' _ingredients_, _instructions_, _diets_ and _calorie count_, as well as references to the _original sources_.

> [!NOTE]
> This project isn't finished. More exciting features are going to be added soon!

## How to run Recipefy locally

Follow these steps to set up the project locally:

1. Clone the repository;
2. Generate key.pem and cert.pem files using the following command: `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365`;
3. Move the key and cert files into a **certs** folder within the root directory;
4. Run `npm run install-all`;
5. Create a .env file in the **root** directory and add the [root variables](https://send.bitwarden.com/#ZDz20L-wGkGRurFsAVJgTQ/MfyQ9RimcaudSxON5er2_A);
6. Run `npm start`;
> [!IMPORTANT]
> Make sure that the .env file is in the server directory. Otherwise, the application isn't going to work.

And you're all set!