// 1
const express = require("express")
const router = express.Router()


// 3
// product 등록하는 API
router.post('/', (req, res) => {

    const product = {
        name : req.body.productName,
        price : req.body.productPrice
    }

    res.json({
        "message" : "product 등록하는 API",
        productInfo : product
    })
})

// product 불러오는 API
router.get('/', (req, res) => {
    res.json({
        "message" : "product 불러오는 API"
    })
})


// product 수정하는 API
router.patch('/', (req, res) => {
    res.json({
        "message" : "product 수정하는 API"
    })
})

// product 삭제하는 API
router.delete('/', (req, res) => {
    res.json({
        "message" : "product 삭제하는 API"
    })
})


// 2
module.exports = router //라우터(router를 모듈화(module)해서 내보내겠다(exports).

