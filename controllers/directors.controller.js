import { Director } from '../models/Director.js'
import { Movie } from '../models/Movie.js'

export const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find().populate('movies')
    return res.status(200).json(directors)
  } catch (error) {
    console.error('Error al obtener directores:', error)
    return res.status(500).json({ message: 'Error al obtener directores' })
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
    console.error('Error al obtener director:', error)
    return res.status(500).json({ message: 'Error al obtener el director' })
  }
}

export const createDirector = async (req, res) => {
  try {
    const { name, country } = req.body

    if (!name) {
      return res.status(400).json({ message: "El campo 'name' es obligatorio" })
    }

    const newDirector = new Director({
      name,
      country,
      movies: []
    })

    const savedDirector = await newDirector.save()
    return res.status(201).json(savedDirector)
  } catch (error) {
    console.error('Error al crear director:', error)
    return res.status(500).json({ message: 'Error al crear el director' })
  }
}

export const updateDirector = async (req, res) => {
  try {
    const { id } = req.params

    const director = await Director.findById(id)
    if (!director) {
      return res.status(404).json({ message: 'Director no encontrado' })
    }

    const { name, country } = req.body

    if (name !== undefined) director.name = name
    if (country !== undefined) director.country = country

    const updated = await director.save()
    return res.status(200).json(updated)
  } catch (error) {
    console.error('Error al actualizar director:', error)
    return res.status(500).json({ message: 'Error al actualizar director' })
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
    console.error('Error al eliminar director:', error)
    return res.status(500).json({ message: 'Error al eliminar director' })
  }
}

export const addMovieToDirector = async (req, res) => {
  try {
    const { id } = req.params
    const { movieId } = req.body

    const director = await Director.findById(id)
    if (!director) {
      return res.status(404).json({ message: 'Director no encontrado' })
    }

    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    if (!director.movies.some((m) => m.toString() === movieId)) {
      director.movies.push(movieId)
    }

    const updated = await director.save()
    return res.status(200).json(updated)
  } catch (error) {
    console.error('Error al añadir película:', error)
    return res
      .status(500)
      .json({ message: 'Error al añadir película al director' })
  }
}
