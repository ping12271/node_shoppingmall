const express = require('express')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

const {
    orders_patch_order,
    orders_get_all,
    orders_get_order,
    orders_patch_order,
    orders_delete_all,
    orders_delete_order
} = require('../controllers/order')

// CRUD
router.post('/', checkAuth, orders_patch_order)

router.get('/', checkAuth, orders_get_all)

router.get('/:orderID', checkAuth, orders_get_order)

router.patch('/:orderID', checkAuth, orders_patch_order)

router.delete('/', checkAuth, orders_delete_all)

router.delete('/:orderID', checkAuth, orders_delete_order)

module.exports = router