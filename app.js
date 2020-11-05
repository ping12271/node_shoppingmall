
// 코드 빌드 순서
// 1. = 을 기준으로 오른쪽에서 왼쪽으로 읽힌다.
// 2. 위에서 아래로 읽힌다.
// 3. .은 function으로 불러온다.

const express = require('express') //require : 요구한다, express를 불러온다.
const app = express() //express의 일반적인 기능들의 모음


app.use((req, res) => {
    res.json({
        "message" : "서버응답했음"
    })
})//req : 사용자 요청(받기) / res : 서버 응답(보내기)







const port = 9999 //9999를 통해서 통신을 하겠다.

app.listen(port, console.log("server started"))//listen(함수)-> app을 실행하겠다는 메서드(방법), port를 통해서만 실행하겠다.

