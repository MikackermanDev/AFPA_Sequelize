// Importer le module express qui permet de créer une application web
const express = require("express");
// Créer une instance de l'application
const app = express();

// Importer les middleware depuis le fichier middleware.js
const { logRequest, ignoreFavicon } = require("./middleware/middleware");

// Utiliser les middleware importés
app.use(logRequest);
app.use(ignoreFavicon);

const myConfig = require("./api/config");
const Sequelize = require("sequelize");
const { host, port, database, user, password } = myConfig.db;
const sequelize = new Sequelize(database, user, password, {
	host,
	port,
	dialect: "mysql",
});

sequelize
	.authenticate()
	.then(() => {
		console.log(`Connexion réussi sur le port : ${port}`);
	})
	.catch((error) => {
		console.error("Connexion échoué", error);
	});

// Définir une route qui répond à toutes les requêtes HTTP avec le code 200 et le message "OK"
app.get("*", (req, res) => {
	res.status(200).json("OK");
});

// Définir le port d'écoute du serveur
const PORT = 8080;
// Lancer le serveur et afficher un message dans la console
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
