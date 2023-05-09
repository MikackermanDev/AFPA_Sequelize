// Importer le module express qui permet de créer une application web
const express = require("express");
// Créer une instance de l'application
const app = express();

// Importer les middleware depuis le fichier middleware.js
// Un middleware est une fonction qui peut modifier ou intercepter les requêtes et les réponses
const { logRequest, ignoreFavicon } = require("./middleware/middleware");

// Utiliser les middleware importés
// Le middleware logRequest va afficher dans la console les informations sur la requête reçue
// Le middleware ignoreFavicon va ignorer les requêtes pour le favicon du site
app.use(logRequest);
app.use(ignoreFavicon);

// Importer le module Db qui gère la connexion à la base de données et la définition des modèles
const Db = require("./api/models/dataBase");
// Synchroniser la base de données avec les modèles définis
Db.synchronize();
// Afficher dans la console la liste des modèles disponibles
console.log("Liste des modèles : ", Db.getModel());

const dbRouter = require("./api/routers/dbRouter");
app.use(dbRouter);
// Définir le port d'écoute du serveur
const PORT = 8080;
// Lancer le serveur et afficher un message dans la console
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
