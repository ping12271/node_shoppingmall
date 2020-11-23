// 1
const express = require("express")
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const {
    products_get_all,
    products_get_product,
    products_post_product,
    products_patch_product,
    products_delete_all,
    products_delete_product
} = require('../controllers/product')

// 3
// product 등록하는 API
router.post('/', checkAuth, products_post_product)

// product 불러오는 API
router.get('/', products_get_all)


// detail product API - 하나만 불러오는 
router.get('/:productID', checkAuth, products_get_product)


// product 수정하는 API
router.patch('/:productID', checkAuth, products_patch_product)


// product 삭제하는 API(전체삭제)
router.delete('/', checkAuth, products_delete_all)

//선택해서 한개만 삭제
router.delete('/:productID', checkAuth, products_delete_product)

// 2
module.exports = router //라우터(router를 모듈화(module)해서 내보내겠다(exports).

