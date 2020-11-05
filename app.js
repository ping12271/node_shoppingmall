
// 코드 빌드 순서
// 1. = 을 기준으로 오른쪽에서 왼쪽으로 읽힌다.
// 2. 위에서 아래로 읽힌다.
// 3. .은 function으로 불러온다.

const express = require('express')
const app = express() //express의 일반적인 기능들의 모음

const port = 9999 //9999를 통해서 통신을 하겠다.


app.listen(port, console.log("server started"))//app=express()을 실행한다 -> listen

