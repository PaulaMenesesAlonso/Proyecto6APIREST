import mongoose from 'mongoose'

export const connectDB = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Conectada a Mongo Atlas'))
    .catch((err) => {
      console.error('Error conectando a Mongo:', err)
      throw err
    })
}
