const exress = require('express')
const router = exress.Router()
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')



// 회원가입 API
router.post('/register', (req, res) => {
    
    //기존 이메일 유무체크 -> 패스워드 암호화 -> db에 저장

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.json({
                message : err
            })
        } else {
            const newUser = new userModel({
                username : req.body.username,
                email : req.body.email,
                password : hash
            })
        
            newUser
                .save()
                .then(user => {
                    res.json({
                        message : 'saved data',
                        userInfo : user
                    })
                })
                .catch(err => {
                    res.json({
                        message : err
                    })
                })
        }
    })
})

// 로그인 API
router.post('/login', (req, res) => {

})





module.exports = router