const express = require('express')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

const orderModel = require("../models/order")

// CRUD
router.post('/', checkAuth, (req, res) => {
    
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

router.get('/', checkAuth, (req, res) => {
    orderModel
        .find()
        .then(docs => {
            res.json({
                message : 'successful get order',
                count : docs.length,
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

router.get('/:orderID', checkAuth, (req, res) => {
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


router.patch('/:orderID', checkAuth, (req, res) => {
    const id = req.params.orderID
    const updataOps = {};
    for (const ops of req.body) {
        updataOps[ops.propName] = ops.value;
        //[ops.propName] : 변경할 대상자
    }
    orderModel
        .findByIdAndUpdate(id, {$set: updataOps})
        .then(() => {
            res.json({
                message : 'updated at ' + id,
                request: {
                    type : "GET",
                    url: "http://localhost:9999/order/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                type : "GET",
                url : "http://localhost:9999/order" + id
            })
        })
})


router.delete('/', checkAuth, (req, res) => {
    
    orderModel
        .remove()
        .then(() => {
            res.json({
                message : 'delete all order',
                request : {
                    type : "GET",
                    url : "http://localhost:9999/order"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

router.delete('/:orderID', checkAuth, (req, res) => {
    const id = req.params.orderID
    orderModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                message : 'delete order at' + id,
                request : {
                    type : "GET",
                    url : "http://localhost:9999/order"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

module.exports = router