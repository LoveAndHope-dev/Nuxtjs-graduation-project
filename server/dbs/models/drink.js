import mongoose from 'mongoose'
const Schema = mongoose.Schema
const drinkSchema = new Schema({
  drinkname: {
    type: String,
    unique: true
  },
  drinkprice: {
    type: Number,
    unique: false
  },
  drinkdescription: {
    type: String,
    unique: false
  },
  drinktype: {
    type: String,
    unique: false
  },
  drinkposition: {
    type: String,
    unique: false
  },
  drinkphoto: {
    type: String,
    unique: true
  }
})
export default mongoose.model('drink', drinkSchema)
