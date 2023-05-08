// Dans le fichier middleware.js
// Définir le middleware pour afficher la date et l'heure de la requête
const logRequest = (req, res, next) => {
	let date = new Date();
	console.log(`Requête reçue le ${date.toLocaleString()}.${date.getMilliseconds()}`);
	next();
};

// Définir le middleware pour ignorer les requêtes pour le favicon
const ignoreFavicon = (req, res, next) => {
	if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
		return res.sendStatus(204);
	}
	next();
};

// Exporter les middleware
module.exports = {
	logRequest,
	ignoreFavicon,
};
