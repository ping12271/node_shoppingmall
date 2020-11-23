const exress = require('express')
const router = exress.Router()

const {
    user_post_register,
    user_post_login
} = require('../controllers/user')



// 회원가입 API
router.post('/register', user_post_register)

// 로그인 API
// localhost:9999/auth/login
router.post('/login', user_post_login)


module.exports = router