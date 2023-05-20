const {Images, imageSchema}  = require('./image.model')

function setuptModels(sequelize){
  Images.init(imageSchema, Images.config(sequelize));
}

module.exports = setuptModels;
