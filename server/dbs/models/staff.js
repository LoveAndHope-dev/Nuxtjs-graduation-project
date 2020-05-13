import mongoose from 'mongoose'
const Schema = mongoose.Schema
const StaffSchema = new Schema({
  staffname: {
    type: String,
    unique: false
  },
  staffsex: {
    type: String,
    unique: false
  },
  staffworkdate: {
    type: String,
    unique: false
  },
  staffphoto: {
    type: String,
    unique: true
  },
  staffemail: {
    type: String,
    unique: true
  },
  staffphonenumber: {
    type: String,
    unique: true
  },
  staffpassword: {
    type: String,
    unique: false
  },
  staffwages: {
    type: Number,
    unique: false
  },
  cartList: [
    {
      goodsId: String,
      goodsPrice: Number,
      goodsName: String,
      goodsNum: Number
    }
  ]
})
export default mongoose.model('Staff', StaffSchema)
