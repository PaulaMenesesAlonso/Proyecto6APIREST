import mongoose from 'mongoose'
import 'dotenv/config'
import { Movie } from '../API/models/Movie.js'
import { moviesSeed } from './movies.data.js'

const seedMovies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conectada a Mongo Atlas para la SEED de películas')

    await Movie.deleteMany()
    console.log("Colección 'movies' limpiada")

    const createdMovies = await Movie.insertMany(moviesSeed)
    console.log(
      `Se han creado ${createdMovies.length} películas en la base de datos`
    )
  } catch (error) {
    console.error('Error ejecutando la seed de películas:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Desconectada de Mongo Atlas (seed terminada)')
    process.exit(0)
  }
}

seedMovies()
