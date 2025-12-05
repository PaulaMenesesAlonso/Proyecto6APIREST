import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import moviesRouter from './routes/movies.routes.js'
import directorsRouter from './routes/directors.routes.js'

const app = express()

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Conectada a Mongo Atlas'))
  .catch((err) => console.error('Error conectando a Mongo:', err))

app.use('/movies', moviesRouter)
app.use('/directors', directorsRouter)

app.get('/', (req, res) => {
  res.send('API de Paula funcionando')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
