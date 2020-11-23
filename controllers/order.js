const orderModel = require('../models/order')

//order 등록해주는 함수
exports.orders_patch_order = (req, res) => {
    
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
}

//order 전체데이터를 불러오는 함수
exports.orders_get_all = (req, res) => {
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
}

//order 상세데이터 불러오는 함수
exports.orders_get_order = (req, res) => {
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
}

//order 수정하는 함수
exports.orders_patch_order = (req, res) => {
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
}

//전체 order 삭제하는 함수
exports.orders_delete_all = (req, res) => {
    
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
};

// 상세 order 삭제하는 함수
exports.orders_delete_order = (req, res) => {
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
}

