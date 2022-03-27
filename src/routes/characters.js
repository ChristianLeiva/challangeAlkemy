const express = require('express')
const router = express.Router()
const Character = require('../../database/models/characters')
const Movie = require('../../database/models/movies')
const asosiation = require('../../database/asociations')

// buscar personajes
router.get('/', async (req, res) => {
  const name = req.query.name
  const age = req.query.age
  const idMovie = req.query.idMovie
  let where = {}

  if (name) {
    where.nombre = name
  }
  if (age) {
    where.edad = age
  }
  if (idMovie) {
    where.pelicula_id = idMovie
  }

  let result = await Character.findAll({
    where: where,
    include: {
      model: Movie,
      as: 'movie',
      attributes: ['titulo'],
    },

    attributes: ['nombre', 'imagen'],
  })

  res.json({ result })
})

//crear personajes
router.post('/create', async (req, res) => {
  const name = req.body.name
  const age = req.body.age
  const weight = req.body.weight
  const history = req.body.history
  const idMovie = req.body.idMovie
  const image = req.body.image
  try {
    await Character.create({
      nombre: name,
      edad: age,
      peso: weight,
      historia: history,
      imagen: image,
      pelicula_id: idMovie,
    })
    res.json({
      code: 'ok',
      message: 'Character created succefuly',
    })
  } catch (error) {
    res.status(400).json({
      code: 'bad request',
      message: 'check your data send',
    })
  }
})

//Update personaje
router.put('/update/:id', async (req, res) => {
  const id = await Character.findOne({ where: { id_personaje: req.params.id } })
  let { name, age, weight, history, image, idMovie } = req.body

  try {
    if (id) {
      await Character.update(
        {
          nombre: name,
          edad: age,
          peso: weight,
          historia: history,
          pelicula_id: idMovie,
          imagen: image,
        },
        {
          where: { id_personaje: id.id_personaje },
        }
      )

      return res.json({
        code: 'ok',
        message: 'character update succefuly',
      })
    } else {
      return res.send('the character does not exits')
    }
  } catch (error) {
    return res.status(400).json({
      code: 'bad requst',
      message: 'the character could not be updated',
      error: error,
    })
  }
})

//Delete Personaje
router.delete('/delete/:id', async (req, res) => {
  const id = await Character.findOne({ where: { id_personaje: req.params.id } })
  try {
    if (id) {
      Character.destroy({
        where: {
          id_personaje: id.id_personaje,
        },
      })
      return res.json({
        code: 'ok',
        message: 'Character deleted succefuly',
      })
    }

    return res.json({
      code: 'error',
      message: 'Character id does not exist',
    })
  } catch (error) {
    return res.status(400).json({
      code: 'bad request',
      error: error,
    })
  }
})

module.exports = router
