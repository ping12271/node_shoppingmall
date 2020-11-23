const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //try에서 에러가 발생하면 catch로 가서 끝난다. 에러가 발생하지 않으면 catch 생략
    try {
        // 사용자 요청에 headers에 담긴다.
        const token = req.headers.authorization.split(" ")[1];// 토큰이 담기는 위치
        const decoded = jwt.verify(token, "hyeeun")//verify : 토큰을 검증해주는 함수
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message : 'Auth failed'
        });
    }
}