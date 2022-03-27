const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../database/db')

const Genre = sequelize.define(
  'Genre',
  {
    id_genero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
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
    tableName: 'genero',
  }
)

console.log(Genre === sequelize.models.Genre)

module.exports = Genre
