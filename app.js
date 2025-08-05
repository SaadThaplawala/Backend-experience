const express = require('express')
const sequelize = require('./config/sequelize.js')
const app = express()

const userroutes = require('./routes/userR')

app.use(express.json())

app.use('/user', userroutes)

sequelize.auth
  .then(() => {
    const port = 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })