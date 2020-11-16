const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product', 
        required : true
    }, // 어떤 제품이 담길것인가?
    quantity : {
        type : Number,
        default : 1
    } //갯수가 몇개냐?
})

module.exports = mongoose.model("order", orderSchema)

