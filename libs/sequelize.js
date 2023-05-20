const {Sequelize} = require('sequelize');

const setupModels  = require('../database/models');

const  sequelize = new Sequelize('images', 'santiago', 'admin123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: true,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
