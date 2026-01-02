import { Movie } from '../models/Movie.js'
import { Director } from '../models/Director.js'

const handleMovieError = (res, error, defaultMessage) => {
  console.error(defaultMessage, error)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos de película no válidos' })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'ID de película no válido' })
  }

  return res.status(500).json({ message: defaultMessage })
}

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
  } catch (error) {
    return handleMovieError(res, error, 'Error al obtener películas')
  }
}

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    return res.status(200).json(movie)
  } catch (error) {
    return handleMovieError(res, error, 'Error al obtener la película')
  }
}

export const createMovie = async (req, res) => {
  try {
    const { title, year, genre, description } = req.body

    if (!title) {
      return res
        .status(400)
        .json({ message: "El campo 'title' es obligatorio" })
    }

    const newMovie = new Movie({
      title,
      year,
      genre,
      description
    })

    const savedMovie = await newMovie.save()
    return res.status(201).json(savedMovie)
  } catch (error) {
    return handleMovieError(res, error, 'Error al crear la película')
  }
}

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params

    const movie = await Movie.findById(id)
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    const { title, year, genre, description } = req.body

    if (title !== undefined) movie.title = title
    if (year !== undefined) movie.year = year
    if (genre !== undefined) movie.genre = genre
    if (description !== undefined) movie.description = description

    const updatedMovie = await movie.save()
    return res.status(200).json(updatedMovie)
  } catch (error) {
    return handleMovieError(res, error, 'Error al actualizar la película')
  }
}

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params

    const deletedMovie = await Movie.findByIdAndDelete(id)

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }
    await Director.updateMany({ movies: id }, { $pull: { movies: id } })

    return res.status(200).json({
      message:
        'Película eliminada correctamente y referencias en directores actualizadas'
    })
  } catch (error) {
    return handleMovieError(res, error, 'Error al eliminar la película')
  }
}
