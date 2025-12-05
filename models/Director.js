import { Schema, model } from 'mongoose'

const directorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Director = model('Director', directorSchema)
