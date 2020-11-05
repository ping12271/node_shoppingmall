

const express = require('express')
const router = express.Router()


// CRUD
router.post('/', (req, res) => {
    res.json({
        "message" : "order를 등록하는 API"
    })
})

router.get('/', (req, res) => {
    res.json({
        "message" : "order를 불러오는 API"
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