const express = require('express')
const { disconnect } = require('mongoose')
const router = express.Router()

const orderModel = require("../models/order")

// CRUD
router.post('/', (req, res) => {
    
    const newOrder = new orderModel({
        product : req.body.productID,
        quantity : req.body.qty
    })

    newOrder
        .save()
        .then(doc => {
            res.json({
                message : "saved data",
                orderInfo : {
                    id : doc._id,
                    product : doc.product,
                    quantity : doc.quantity,
                    request : {
                        type : "GET",
                        url : "http://localhost:9999/order/" + doc._id
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

router.get('/', (req, res) => {
    orderModel
        .find()
        .then(docs => {
            res.json({
                message : 'successful get order',
                count : disconnect.length,
                order : docs.map(doc => {
                    return {
                        id : doc._id,
                        product : doc.product,
                        quantity : doc.quantity,
                        request : {
                            type : "GET",
                            url : "http://localhost:9999/order/" + doc._id
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
    //     "message" : "order를 불러오는 API"
    // })
})

router.get('/:orderID', (req, res) => {
    const id = req.params.orderID
    orderModel
        .findById(id)
        .then(doc => {
            res.json({
                message : 'get detail data ' + id,
                orderInfo : {
                    id : doc._id,
                    product : doc.product,
                    quantity : doc.quantity,
                    request : {
                        type : "GET",
                        url : "http://localhost:9999/order/"
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


router.patch('/', (req, res) => {
   res.json({
       "message" : "order를 수정하는 API"
   })
})

router.delete('/', (req, res) => {
    res.json({
        "message" : "order 삭제하는 API"
    })
})


module.exports = router