import mongoose from 'mongoose'
const Schema = mongoose.Schema
const photoSchema = new Schema({
  photo: {
    type: String,
    unique: false
  }
})
export default mongoose.model('photo', photoSchema)
