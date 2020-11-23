const productModel = require('../models/product')

// product 전체데이터를 불러오는 함수
exports.products_get_all = (req, res) => {

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

};

// product 상세데이터 불러오는 함수
exports.products_get_product = (req, res) => {

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
};

// product 등록해주는 함수
exports.products_post_product = (req, res) => {

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

}

// 제품 수정하는 함수
exports.products_patch_product = (req, res) => {

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
};

//제품 전체 삭제하는 함수
exports.products_delete_all = (req, res) => {
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

};

//상세 데이터 삭제하는 함수
exports.products_delete_product = (req, res) => {
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
}