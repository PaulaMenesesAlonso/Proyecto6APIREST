import { Movie } from '../models/Movie.js'

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
  } catch (error) {
    console.error('Error al obtener películas:', error)
    return res.status(500).json({ message: 'Error al obtener películas' })
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
    console.error('Error al obtener película:', error)
    return res.status(500).json({ message: 'Error al obtener la película' })
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
    console.error('Error al crear película:', error)
    return res.status(500).json({ message: 'Error al crear la película' })
  }
}

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    return res.status(200).json(updatedMovie)
  } catch (error) {
    console.error('Error al actualizar película:', error)
    return res.status(500).json({ message: 'Error al actualizar la película' })
  }
}

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params

    const deletedMovie = await Movie.findByIdAndDelete(id)

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    return res.status(200).json({ message: 'Película eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar película:', error)
    return res.status(500).json({ message: 'Error al eliminar la película' })
  }
}
