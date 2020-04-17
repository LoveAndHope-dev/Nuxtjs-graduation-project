import mongoose from 'mongoose'
const Schema = mongoose.Schema
const articleSchema = new Schema({
  articlename: {
    type: String,
    unique: true
  },
  articledate: {
    type: String,
    unique: false
  },
  articletext: {
    type: String,
    unique: false
  }
})
export default mongoose.model('article', articleSchema)
