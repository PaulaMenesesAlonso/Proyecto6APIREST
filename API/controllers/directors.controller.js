import { Director } from '../models/Director.js'
import { Movie } from '../models/Movie.js'

const handleDirectorError = (res, error, defaultMessage) => {
  console.error(defaultMessage, error)

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos de director no válidos' })
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'ID no válido' })
  }

  return res.status(500).json({ message: defaultMessage })
}

export const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find().populate('movies')
    return res.status(200).json(directors)
  } catch (error) {
    return handleDirectorError(res, error, 'Error al obtener directores')
  }
}

export const getDirectorById = async (req, res) => {
  try {
    const { id } = req.params
    const director = await Director.findById(id).populate('movies')

    if (!director) {
      return res.status(404).json({ message: 'Director no encontrado' })
    }

    return res.status(200).json(director)
  } catch (error) {
    return handleDirectorError(res, error, 'Error al obtener el director')
  }
}

export const createDirector = async (req, res) => {
  try {
    const { name, country, movies } = req.body

    if (!name) {
      return res.status(400).json({ message: "El campo 'name' es obligatorio" })
    }

    let moviesArray = []

    if (Array.isArray(movies) && movies.length > 0) {
      const existingMovies = await Movie.find({ _id: { $in: movies } })

      if (existingMovies.length !== movies.length) {
        return res
          .status(400)
          .json({ message: 'Alguna de las películas indicadas no existe' })
      }

      moviesArray = [...new Set(movies)]
    }

    const newDirector = new Director({
      name,
      country,
      movies: moviesArray
    })

    const savedDirector = await newDirector.save()
    return res.status(201).json(savedDirector)
  } catch (error) {
    return handleDirectorError(res, error, 'Error al crear el director')
  }
}

export const updateDirector = async (req, res) => {
  try {
    const { id } = req.params

    const director = await Director.findById(id)
    if (!director) {
      return res.status(404).json({ message: 'Director no encontrado' })
    }

    const { name, country, movies } = req.body

    if (name !== undefined) director.name = name
    if (country !== undefined) director.country = country

    if (movies !== undefined) {
      if (!Array.isArray(movies)) {
        return res
          .status(400)
          .json({ message: "El campo 'movies' debe ser un array de IDs" })
      }

      if (movies.length > 0) {
        const existingMovies = await Movie.find({ _id: { $in: movies } })

        if (existingMovies.length !== movies.length) {
          return res
            .status(400)
            .json({ message: 'Alguna de las películas indicadas no existe' })
        }

        director.movies = [...new Set(movies)]
      } else {
        director.movies = []
      }
    }

    const updated = await director.save()
    return res.status(200).json(updated)
  } catch (error) {
    return handleDirectorError(res, error, 'Error al actualizar director')
  }
}

export const deleteDirector = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Director.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: 'Director no encontrado' })
    }

    return res.status(200).json({ message: 'Director eliminado correctamente' })
  } catch (error) {
    return handleDirectorError(res, error, 'Error al eliminar director')
  }
}

export const addMovieToDirector = async (req, res) => {
  try {
    const { id } = req.params
    const { movieId, action = 'add' } = req.body

    if (!movieId) {
      return res
        .status(400)
        .json({ message: "El campo 'movieId' es obligatorio" })
    }

    const movieExists = await Movie.exists({ _id: movieId })
    if (!movieExists) {
      return res
        .status(404)
        .json({ message: 'Película no encontrada en la base de datos' })
    }

    let updateOperation

    if (action === 'add') {
      updateOperation = { $addToSet: { movies: movieId } }
    } else if (action === 'remove') {
      updateOperation = { $pull: { movies: movieId } }
    } else {
      return res
        .status(400)
        .json({ message: "El campo 'action' debe ser 'add' o 'remove'" })
    }

    const updatedDirector = await Director.findByIdAndUpdate(
      id,
      updateOperation,
      { new: true }
    ).populate('movies')

    if (!updatedDirector) {
      return res.status(404).json({ message: 'Director no encontrado' })
    }

    return res.status(200).json(updatedDirector)
  } catch (error) {
    return handleDirectorError(
      res,
      error,
      'Error al actualizar las películas asociadas al director'
    )
  }
}
