import { Schema, model } from 'mongoose'

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number },
    genre: { type: String, trim: true },
    description: { type: String, trim: true }
  },
  {
    timestamps: true
  }
)

export const Movie = model('Movie', movieSchema)
