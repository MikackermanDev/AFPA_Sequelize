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

// Déclaration de la fonction Db.selectAll qui prend en paramètre le nom d'une table
Db.selectAll = async (modelName) => {
	try {
		// On utilise la méthode getModel de l'objet Db pour récupérer le modèle de la table à partir du nom
		const rows = await Db.getModel(modelName)?.findAll();
		// On utilise la méthode findAll du modèle pour sélectionner toutes les lignes de la table
		// On utilise le mot-clé await pour attendre la résolution de la promesse renvoyée par findAll
		// On utilise l'opérateur ?. pour vérifier que le modèle existe avant d'appeler la méthode findAll
		// On stocke le résultat dans la variable rows
		return { data: rows, result: true, message: "OK 🆗" };
		// On renvoie un objet avec trois propriétés : data contient les lignes trouvées, result contient un booléen indiquant le succès de l'opération, et message contient un emoji
	} catch (err) {
		// En cas d'erreur lors de l'exécution du bloc try, on exécute le bloc catch
		return { data: rows, result: true, message: "😡" };
		// On renvoie un objet similaire au précédent mais avec un message d'échec
	}
};

// Déclaration de la fonction Db.selectOne qui prend en paramètre le nom d'une table et l'identifiant d'une ligne
Db.selectOne = async (modelName) => {
	try {
		// On utilise la même méthode que précédemment pour récupérer le modèle de la table
		const rows = await Db.getModel(modelName)?.findByPk(id);
		// On utilise la méthode findByPk du modèle pour sélectionner une ligne par son identifiant
		return { data: rows, result: true, message: "OK 🆗" };
		// On renvoie un objet avec les mêmes propriétés que précédemment
	} catch (err) {
		// En cas d'erreur lors de l'exécution du bloc try, on exécute le bloc catch
		return { data: rows, result: true, message: "😡" };
		// On renvoie un objet similaire au précédent mais avec un message d'échec
	}
};

// Déclaration de la fonction Db.selectWhere qui prend en paramètre le nom d'une table et une condition
Db.selectWhere = async (modelName) => {
	try {
		// On utilise la même méthode que précédemment pour récupérer le modèle de la table
		const rows = await Db.getModel(modelName)?.findAll({ where });
		// On utilise la méthode findAll du modèle avec l'option where pour sélectionner des lignes selon une condition
		return { data: rows, result: true, message: "OK 🆗" };
		// On renvoie un objet avec les mêmes propriétés que précédemment
	} catch (err) {
		// En cas d'erreur lors de l'exécution du bloc try, on exécute le bloc catch
		return { data: rows, result: true, message: "😡" };
		// On renvoie un objet similaire au précédent mais avec un message d'échec
	}
};

// Déclaration de la fonction Db.insertOrUpdate qui prend en paramètre le nom d'une table et un objet JSON représentant des lignes à insérer ou à mettre à jour
Db.insertOrUpdate = async (modelName, json) => {
	if (!Array.isArray(json)) {
		// Si l'objet JSON n'est pas un tableau, on le transforme en tableau avec un seul élément
		json = [json];
	}
	const fields = Object.keys(Db.getModel(modelName).rawAttributes);
	// On utilise la méthode Object.keys pour récupérer les noms des attributs du modèle de la table
	// On utilise la même méthode que précédemment pour récupérer le modèle de la table
	// On stocke le résultat dans la variable fields
	const rows = await Db.getModel(modelName).bulkCreate(json, {
		updateOnDuplicate: fields,
		individualHooks: true,
	});
	// On utilise la méthode bulkCreate du modèle pour insérer ou mettre à jour des lignes en masse
	// On passe en paramètre le tableau json contenant les objets à insérer ou à mettre à jour
	// On passe également un objet d'options avec deux propriétés : updateOnDuplicate contient le tableau fields indiquant quels attributs doivent être mis à jour en cas de doublon, et individualHooks contient un booléen indiquant si les hooks doivent être exécutés pour chaque ligne
	// On utilise le mot-clé await pour attendre la résolution de la promesse renvoyée par bulkCreate
	// On stocke le résultat dans la variable rows
	return { data: rows, result: true, message: "OK 🆗" };
	// On renvoie un objet avec les mêmes propriétés que précédemment
};

// Déclaration de la fonction Db.deleteOne qui prend en paramètre le nom d'une table et l'identifiant d'une ligne à supprimer
Db.deleteOne = async (modelName, id) => {
	const exists = await Db.getModel(modelName)?.destroy({ where: { id } });
	// On utilise la méthode destroy du modèle pour supprimer une ligne selon une condition
	// On passe en paramètre un objet avec la propriété where contenant un objet avec l'identifiant de la ligne à supprimer
	// On stocke le résultat dans la variable exists qui indique si la ligne existait avant la suppression
	return { data: exists, result: true, message: "OK🆗" };
	// On renvoie un objet avec les mêmes propriétés que précédemment mais avec data contenant le booléen exists
};

// Exporter l'objet Db et DataTypes pour pouvoir les utiliser dans d'autres fichiers
module.exports = { ...Db, DataTypes };
