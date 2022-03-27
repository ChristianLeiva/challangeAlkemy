const express = require('express')
const app = express()
const PORT = process.env.DEFAULT_PORT || 3000
const sequelize = require('./database/db')
const userRouter = require('./src/routes/users')
const characterRouter = require('./src/routes/characters')
const movieRouter = require('./src/routes/movies')
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello word')
})
//user
app.use('/auth', userRouter)
//character
app.use('/characters', characterRouter)
//movies
app.use('/movies', movieRouter)

app.listen(PORT, () => {
  console.log(`Server Started at localhost:${3000}`)
  // nos conectamos a la base de datos
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database conected succefuly')
    })
    .catch((error) => {
      console.log(`Se ha producido un error: ${error}`)
    })
})
