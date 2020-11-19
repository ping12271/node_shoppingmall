const exress = require('express')
const router = exress.Router()
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')



// 회원가입 API
router.post('/register', (req, res) => {
    
    //기존 이메일 유무체크 -> 패스워드 암호화 -> db에 저장

    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.json({
                    message : 'email이 있습니다. 다른 email로 가입해주세요'
                })
            } else {
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
            }
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })

})

// 로그인 API
router.post('/login', (req, res) => {

})





module.exports = router