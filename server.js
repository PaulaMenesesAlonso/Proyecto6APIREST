import express from 'express'
import 'dotenv/config'
import moviesRouter from './API/routes/movies.routes.js'
import directorsRouter from './API/routes/directors.routes.js'
import { connectDB } from './config/db.js'

const app = express()

app.use(express.json())

connectDB()

app.use('/movies', moviesRouter)
app.use('/directors', directorsRouter)

app.get('/', (req, res) => {
  res.send('API de Paula funcionando')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
