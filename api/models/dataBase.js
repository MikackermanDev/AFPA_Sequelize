const Db = {};
const { Sequelize, DataTypes } = require("sequelize");
const myConfig = require("../config");

const { host, port, database, user, password } = myConfig.db;
Db.connection = new Sequelize(database, user, password, {
	host,
	port,
	dialect: "mysql",
});

Db.commonField = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	createdBy: {
		type: DataTypes.INTEGER,
	},
	updatedBy: {
		type: DataTypes.INTEGER,
	},
	deletedBy: {
		type: DataTypes.INTEGER,
	},
};

Db.getModel = (modelName = null) => {
	if (!Db.models) {
		require(".");
		Db.models = Db.connection.models;
	}
	if (modelName) {
		return Db.models[modelName];
	}
	return Db.models;
};

Db.synchronize = (option = { alter: true }) => {
	if (!Db.models) {
		require(".");
		Db.models = Db.connection.models;
	}
	Db.connection.sync(option);
};

module.exports = { ...Db, DataTypes };
