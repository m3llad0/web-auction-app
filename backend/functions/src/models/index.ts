'use strict';
import fs from 'fs';
import path from 'path';
import config from '../config/config';
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db: any = {};

let sequelize: any;
if (env === 'development') {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      dialect: config.development.dialect,
      host: config.development.host,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      },
      define: {
        timestamps: false, // if true, adds two attributes to the table
        freezeTableName: true,
      },
    }
  );
} else if (env === 'test') {
  sequelize = new Sequelize(
    config.test.database,
    config.test.username,
    config.test.password,
    {
      dialect: config.test.dialect,
      host: config.test.host,
      define: {
        timestamps: false, // if true, adds two attributes to the table
        freezeTableName: true,
      },
    }
  );
} else if (env === 'production') {
  sequelize = new Sequelize(
    config.production.database,
    config.production.username,
    config.production.password,
    {
      dialect: config.production.dialect,
      host: config.production.host,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      },
      define: {
        timestamps: false, // if true, adds two attributes to the table
        freezeTableName: true,
      },
    }
  );
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
