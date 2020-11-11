// 1
const express = require("express")
const router = express.Router()

const productModel = require("../models/product")


// 3
// product 등록하는 API
router.post('/', (req, res) => {

    // const product = {
    //     name : req.body.productName,
    //     price : req.body.productPrice
    // }

    // res.json({
    //     "message" : "product 등록하는 API",
    //     productInfo : product
    // })

    const newProduct = new productModel({
        name : req.body.productName,
        price : req.body.productPrice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message : "saved data",
                productInfo : doc
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })

})

// product 불러오는 API
router.get('/', (req, res) => {

    productModel
        .find()
        .then(docs => {
            res.json({
                message : "successful get product",
                count : docs.length,
                products : docs
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })


    // res.json({
    //     "message" : "product 불러오는 API"
    // })
})


// detail product API - 하나만 불러오는 
router.get('/:productID', (req, res) => {
    productModel
        .findById(req.params.productID)
        .then(doc => {
            res.json({
                message : "get detail data",
                product : doc
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
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

