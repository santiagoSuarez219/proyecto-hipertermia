const {Model, DataTypes, Sequelize} = require('sequelize');

const IMAGE_TABLE = 'images';

const imageSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  data: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.FLOAT),
  },
  fecha: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  hora: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  data_sensor: {
    allowNull: false,
    type: DataTypes.FLOAT,
  }
};

class Images extends Model {
  static associate(models) {
    // define association here
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'Images',
      timestamps: false,
    };
  }
}

module.exports = {IMAGE_TABLE,imageSchema, Images};
