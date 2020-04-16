import mongoose from 'mongoose'
const Schema = mongoose.Schema
const cakeSchema = new Schema({
  cakename: {
    type: String,
    unique: true
  },
  cakeprice: {
    type: Number,
    unique: false
  },
  cakedescription: {
    type: String,
    unique: false
  },
  caketype: {
    type: String,
    unique: false
  },
  caketaste: {
    type: String,
    unique: false
  },
  cakephoto: {
    type: String,
    unique: true
  }
})
export default mongoose.model('cake', cakeSchema)
