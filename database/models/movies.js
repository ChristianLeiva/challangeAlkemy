const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../database/db')

const Movie = sequelize.define(
  'Movie',
  {
    id_pelicula_serie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    personaje_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'pelicula_serie',
  }
)

console.log(Movie === sequelize.models.Movie)
module.exports = Movie
