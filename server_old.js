// Importer le module express qui permet de créer une application web
const express = require("express");
// Créer une instance de l'application
const app = express();

// Utiliser un middleware personnalisé pour afficher la date et l'heure de la requête dans la console
app.use((req, res, next) => {
	let date = new Date();
	console.log(`Requête reçue le ${date.toLocaleString()}.${date.getMilliseconds()}`);
	next();
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
