import mongoose from 'mongoose'
const Schema = mongoose.Schema
const orderSchema = new Schema({
  ordertime: {
    type: String,
    unique: false
  },
  staffid: {
    type: String,
    unique: false
  },
  ordertable: {
    type: String,
    unique: false
  },
  orderstatus: {
    type: Boolean,
    unique: false
  },
  orderlist: [
    {
      id: String,
      price: Number,
      name: String,
      num: Number
    }
  ]
})
export default mongoose.model('Order', orderSchema)
