// Importer les éléments nécessaires depuis le fichier dataBase.js
// DataTypes est un objet qui contient les types de données disponibles pour les modèles
// connection est une instance de Sequelize qui permet de se connecter à la base de données
// commonFields est un objet qui contient des attributs communs à tous les modèles
const { DataTypes, connection, commonFields } = require("./dataBase");

// Définir un modèle pour la table Customer
// Un modèle représente une table dans la base de données et définit sa structure et son comportement
const Customer = connection.define(
	"Customer", // Le nom du modèle
	{
		...commonFields, // Utiliser l'opérateur de décomposition pour ajouter les attributs communs
		pseudo: {
			type: DataTypes.STRING, // Le type de l'attribut pseudo est une chaîne de caractères
			allowNull: false, // L'attribut pseudo ne peut pas être nul
		},
		firstName: {
			type: DataTypes.STRING, // Le type de l'attribut firstName est une chaîne de caractères
			allowNull: false, // L'attribut firstName ne peut pas être nul
		},
		lastName: {
			type: DataTypes.STRING, // Le type de l'attribut lastName est une chaîne de caractères
			allowNull: false, // L'attribut lastName ne peut pas être nul
		},
	},
	{
		tableName: "Customer", // Le nom de la table dans la base de données
		paranoid: true, // Le mode paranoid permet de conserver les lignes supprimées avec un timestamp
	}
);
// Exporter le modèle Customer pour pouvoir l'utiliser dans d'autres fichiers
module.exports = Customer;
