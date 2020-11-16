// 1
const mongoose = require('mongoose')



// 2
const productSchema = mongoose.Schema({
    // 4
    name : {
        type : String,
        required : true // 빈여백방지, 공백인 db금지
    },
    price : {
        type : Number,
        required : true
    }
})


// 3
module.exports = mongoose.model("product", productSchema)

//db에 product라는 폴더에 저장된다.