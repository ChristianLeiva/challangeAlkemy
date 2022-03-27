const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../database/db')

const Character = sequelize.define(
  'Character',
  {
    id_personaje: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.DECIMAL,
    },
    historia: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    pelicula_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'personaje',
  }
)

console.log(Character === sequelize.models.Character)

module.exports = Character
