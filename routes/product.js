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
                productInfo : {
                    id : doc._id,
                    name : doc.name,
                    price : doc.price,
                    request : {
                        type : "GET",
                        url : "http://localhost:9999/product/" + doc._id
                    }
                }
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
                products : docs.map(doc => {
                    return {
                        id : doc._id,
                        name : doc.name,
                        price : doc.price,
                        request: {
                            type : "GET",
                            url : "http://localhost:9999/product/" + doc._id
                        }
                    }
                })
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

    const id = req.params.productID
    productModel
        .findById(id)
        .then(doc => {
            res.json({
                message : "get detail data " + id,
                product : {
                    id : doc._id,
                    name : doc.name,
                    price : doc.price
                },
                requst: {
                    type : 'GET',
                    url : "http://localhost:9999/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})


// product 수정하는 API
router.patch('/:productID', (req, res) => {

    const id = req.params.productID
    const updateOps = {};
    //사용자 입력값이 req.body -> ops -> updateOps로 담긴다.
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    productModel
        .findByIdAndUpdate(id, {$set: updateOps}) //id의 내용을 updateOps로 대신한다
        .then(() => {
            res.json({
                meassage : 'updated at ' + id,
                request : {
                    type : "GET",
                    url : "http://localhost:9999/product/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
    // res.json({
    //     "message" : "product 수정하는 API"
    // })
})


// product 삭제하는 API(전체삭제)
router.delete('/', (req, res) => {
    productModel
        .remove()
        .then(() => {
            res.json({
                message : "deleted all product",
                request : {
                    type : "GET",
                    url : "http://localhost:9999/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
    // res.json({
    //     "message" : "product 삭제하는 API"
    // })
})

//선택해서 한개만 삭제
router.delete('/:productID', (req, res) => {
    const id = req.params.productID
    productModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                message : "deleted product at" + id,
                request : {
                    type : "GET",
                    url : "http://localhost:9999/product/"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

// 2
module.exports = router //라우터(router를 모듈화(module)해서 내보내겠다(exports).

