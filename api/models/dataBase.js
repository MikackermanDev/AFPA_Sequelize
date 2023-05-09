// Créer un objet Db qui va contenir les éléments nécessaires pour gérer la base de données
const Db = {};
// Importer Sequelize et DataTypes depuis le module sequelize
// Sequelize est un ORM qui permet de manipuler des bases de données relationnelles avec du code JavaScript
// DataTypes est un objet qui contient les types de données disponibles pour les modèles
const { Sequelize, DataTypes } = require("sequelize");
// Importer la configuration depuis le fichier config.js
const myConfig = require("../config");

// Extraire les informations de connexion à la base de données depuis la configuration
const { host, port, database, user, password } = myConfig.db;
// Créer une instance de Sequelize pour se connecter à la base de données
Db.connection = new Sequelize(database, user, password, {
	host,
	port,
	dialect: "mysql",
});

// Définir un objet commonField qui contient des attributs communs à tous les modèles
Db.commonField = {
	id: {
		type: DataTypes.INTEGER, // Le type de l'attribut id est un entier
		autoIncrement: true, // L'attribut id s'incrémente automatiquement
		primaryKey: true, // L'attribut id est la clé primaire de la table
	},
	createdBy: {
		type: DataTypes.INTEGER, // Le type de l'attribut createdBy est un entier
	},
	updatedBy: {
		type: DataTypes.INTEGER, // Le type de l'attribut updatedBy est un entier
	},
	deletedBy: {
		type: DataTypes.INTEGER, // Le type de l'attribut deletedBy est un entier
	},
};

// Définir une méthode getModel qui permet de récupérer les modèles définis dans la base de données
// Si un nom de modèle est passé en paramètre, la méthode renvoie le modèle correspondant
// Sinon, la méthode renvoie tous les modèles disponibles
Db.getModel = (modelName = null) => {
	if (!Db.models) {
		require("."); // Importer le fichier index.js qui contient les définitions des modèles
		Db.models = Db.connection.models; // Stocker les modèles dans l'objet Db
	}
	if (modelName) {
		return Db.models[modelName]; // Renvoyer le modèle demandé
	}
	return Db.models; // Renvoyer tous les modèles
};

// Définir une méthode synchronize qui permet de synchroniser la base de données avec les modèles définis
// La méthode prend en paramètre un objet option qui peut contenir des paramètres de synchronisation
// Par défaut, l'option alter est à true, ce qui signifie que la base de données sera modifiée pour correspondre aux modèles
Db.synchronize = (option = { alter: true }) => {
	if (!Db.models) {
		require("."); // Importer le fichier index.js qui contient les définitions des modèles
		Db.models = Db.connection.models; // Stocker les modèles dans l'objet Db
	}
	Db.connection.sync(option); // Synchroniser la base de données avec les modèles
};

// Exporter l'objet Db et DataTypes pour pouvoir les utiliser dans d'autres fichiers
module.exports = { ...Db, DataTypes };
