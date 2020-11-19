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
                                    message : err.message
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
// localhost:9999/auth/login
router.post('/login', (req, res) => {


    // 이메일 유무 체크 -> 패스워드 매칭 -> 회원정보 뿌리기 
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(!user) { //user가 없으면
                return res.json({
                    message : 'email이 없습니다. 회원가입부터 해주세요'
                })
            } else {
                // 패스워드 복호화 : compare(매칭해주는 함수), 사용자 입력값(req.body.password)과 db에 저장되어 있는 값(user.password)을 비교
                // 매칭과정중에 에러가 있으면 -> err / 성공하든 실패하든 isMatch로 담기고 true,false로 리턴(내보내기)된다
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if(err || isMatch === false) {
                        return res.json({
                            message : 'password incorrect',
                            result : isMatch
                        })
                    } else {
                        res.json({
                            result : isMatch,
                            message : "login user"
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message : err
            })
        })

})





module.exports = router