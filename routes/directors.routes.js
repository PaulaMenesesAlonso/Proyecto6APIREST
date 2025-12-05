import { Router } from 'express'
import {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  addMovieToDirector
} from '../controllers/directors.controller.js'

const router = Router()

router.get('/', getDirectors)

router.get('/:id', getDirectorById)

router.post('/', createDirector)

router.put('/:id', updateDirector)

router.delete('/:id', deleteDirector)

router.put('/:id/add-movie', addMovieToDirector)

export default router
