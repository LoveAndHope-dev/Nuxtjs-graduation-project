import mongoose from 'mongoose'
const Schema = mongoose.Schema
const tableSchema = new Schema({
  tablename: {
    type: String,
    unique: true
  },
  tablecondition: {
    type: String,
    unique: true
  },
  tablepeople: {
    type: Number,
    unique: false
  }
})
export default mongoose.model('table', tableSchema)