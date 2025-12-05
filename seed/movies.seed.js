import mongoose from 'mongoose'
import 'dotenv/config'
import { Movie } from '../models/Movie.js'

const moviesSeed = [
  {
    title: 'Psicosis',
    year: 1960,
    genre: 'Thriller',
    description: 'Clásico del suspense psicológico de Alfred Hitchcock.'
  },
  {
    title: 'Vértigo',
    year: 1958,
    genre: 'Thriller',
    description:
      'Obsesión, misterio y vértigo emocional, dirigida por Hitchcock.'
  },
  {
    title: 'La ventana indiscreta',
    year: 1954,
    genre: 'Misterio',
    description:
      'Un fotógrafo observa a sus vecinos y sospecha de un asesinato.'
  },
  {
    title: 'Los pájaros',
    year: 1963,
    genre: 'Terror',
    description:
      'Pájaros que se rebelan contra la humanidad. Hitchcock en estado puro.'
  },
  {
    title: 'Con la muerte en los talones',
    year: 1959,
    genre: 'Suspense',
    description: 'Confusión de identidad, espionaje y huida a contrarreloj.'
  }
]

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
