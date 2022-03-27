const express = require('express')
const router = express.Router()
const User = require('../../database/models/users')
const bcrypt = require('bcrypt')
const sendGridMail = require('@sendgrid/mail')
require('dotenv').config()

router.get('/', async (req, res) => {
  const result = await User.findAll()

  res.send(result)
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !password || !email) {
    return res.status(400).json({
      code: 'bad request',
      message: 'check the date your are send',
    })
  }

  try {
    const user = await User.findOne({ where: { nombre: req.body.username } })
    if (user) {
      return res.send('username already exists')
    }
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)
    await User.create({
      nombre: username,
      password: hashed,
      email: email,
    })

    await sendEmail(email)
    return res.status(200).send('user created succefuly')
  } catch (error) {
    console.log(error)
  }
})

//login
router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      code: 'bad request',
    })
  }
  try {
    const usuario = await User.findOne({ where: { nombre: req.body.username } })
    if (!usuario) {
      return res.status(404).json({
        code: 'bad request',
        message: 'User does not exist',
      })
    }

    bcrypt.compare(req.body.password, usuario.password, (err, valid) => {
      if (err) {
        return res.status(404).json({
          code: 'bad request',
          message: 'Authentication Error',
        })
      }
      if (!valid) {
        return res.status(404).json({
          code: 'bad request',
          message: 'User or password does not exist',
        })
      }
      res.json({
        code: 'ok',
        message: 'User logged',
      })
    })
  } catch (error) {
    res.send(error)
  }
})

//sendGrid

sendGridMail.setApiKey(process.env.SGAPIKEY)

function getMessage(email) {
  const body = 'Bienvenido al sitio Alkemy challenge NODE.js'
  return {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: 'Test email with Node.js and SendGrid',
    text: body,
    html: `<strong>${body}</strong>`,
  }
}

async function sendEmail(email) {
  try {
    await sendGridMail.send(getMessage(email))
    console.log('Test email sent successfully')
  } catch (error) {
    console.error('Error sending test email')
    console.error(error)
    if (error.response) {
      console.error(error.response.body)
    }
  }
}
module.exports = router
