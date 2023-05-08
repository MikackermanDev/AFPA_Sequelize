// Importer le module dotenv qui permet de charger les variables d'environnement depuis un fichier .env
const dotenv = require("dotenv");
// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Définir un objet myConfig qui contient les informations de la base de données pour le mode développement (dev)
const myConfig = {
	dev: {
		db: {
			host: "localhost", // L'adresse du serveur de la base de données
			port: "3306", // Le port du serveur de la base de données
			user: "root", // Le nom d'utilisateur pour se connecter à la base de données
			password: "", // Le mot de passe pour se connecter à la base de données
			database: "db_blog_code_first", // Le nom de la base de données
		},
	},
};

// Exporter la partie de l'objet myConfig qui correspond à la valeur de la variable d'environnement NODE_ENV
// Par exemple, si NODE_ENV vaut "dev", exporter myConfig.dev.db
module.exports = myConfig[process.env.NODE_ENV];
