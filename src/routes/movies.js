const express = require('express')
const router = express.Router()
const Movie = require('../../database/models/movies')
const Genre = require('../../database/models/genre')
const Sequelize = require('sequelize')

//find movies
router.get('/', async (req, res) => {
  const title = req.query.title
  const genre = req.query.genre
  const order = req.query.order

  let where = {}

  if (title) {
    where.titulo = {
      [Sequelize.Op.and]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('titulo')), {
          [Sequelize.Op.like]: '%' + title + '%',
        }),
      ],
    }
  }
  if (genre) {
    where.genre = genre
  }

  if (order) {
    where.order = order
  }
  let result
  result = await Movie.findAll({
    where: where,
    include: {
      model: Genre,
      as: 'genre',
      attributes: ['nombre'],
    },

    attributes: ['titulo', 'imagen', 'fecha_creacion'],
  })

  res.send(result)
})

//create movie
router.post('/create', async (req, res) => {
  const title = req.body.title
  const date = req.body.date
  const image = req.body.image
  const character_id = req.body.character_id
  const calificacionPrueba = req.body.calification
  const genre = req.body.genre
  let calification = ''
  try {
    if (calificacionPrueba < 0 || calificacionPrueba > 5) {
      res.status(400).json({
        code: 'bad requst',
        error: 'the qualification must be from 1 to 5',
      })
    } else {
      calification = calificacionPrueba
    }
    await Movie.create({
      titulo: title,
      fecha_creacion: date,
      calificacion: calification,
      personaje_id: character_id,
      imagen: image,
      genero_id: genre,
    })
    res.json({
      code: 'ok',
      message: 'Movie created succefuly',
    })
  } catch (error) {
    res.status(400).json({
      code: 'bad request',
      message: 'check your data send',
    })
  }
})
//update movie
router.put('/update/:id', async (req, res) => {
  const movie = await Movie.findOne({
    where: { id_pelicula_serie: req.params.id },
  })
  let { title, calification, date, image, character_id, genre } = req.body

  try {
    if (movie) {
      await Movie.update(
        {
          titulo: title,
          imagen: image,
          fecha_creacion: date,
          calificacion: calification,
          personaje_id: character_id,
          genero_id: genre,
        },
        {
          where: { id_pelicula_serie: movie.id_pelicula_serie },
        }
      )

      res.json({
        code: 'ok',
        message: 'movie update succefuly',
      })
    } else {
      res.send('the movie does not exits')
    }
  } catch (error) {
    res.status(400).json({
      code: 'bad requst',
      message: 'the movie could not be updated',
      error: error,
    })
  }
})
//Delete movie
router.delete('/delete/:id', async (req, res) => {
  const id = await Movie.findOne({
    where: { id_pelicula_serie: req.params.id },
  })
  try {
    if (id) {
      Movie.destroy({
        where: {
          id_pelicula_serie: id.id_pelicula_serie,
        },
      })
      return res.json({
        code: 'ok',
        message: 'movie deleted succefuly',
      })
    } else {
      return res.json({
        code: 'error',
        message: 'movie does not exist',
      })
    }
  } catch (error) {
    return res.status(400).json({
      code: 'bad request',
      error: error,
    })
  }
})
module.exports = router
