const Character = require('./models/characters')
const Movie = require('./models/movies')
const Genre = require('./models/genre')
const Sequelize = require('sequelize')

Movie.hasMany(Character, { foreignKey: 'pelicula_id', as: 'characters' })
Character.belongsTo(Movie, { foreignKey: 'pelicula_id', as: 'movie' })

Movie.belongsTo(Genre, { foreignKey: 'genero_id', as: 'genre' })
Genre.hasMany(Movie, { foreignKey: 'genero_id', as: 'genre' })
