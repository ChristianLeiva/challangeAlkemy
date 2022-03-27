const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define(
  'User',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: 'usuario',
  }
)

console.log(User === sequelize.models.User)

module.exports = User
