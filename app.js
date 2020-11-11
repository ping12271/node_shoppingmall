
// 코드 빌드 순서
// 1. = 을 기준으로 오른쪽에서 왼쪽으로 읽힌다.
// 2. 위에서 아래로 읽힌다.
// 3. .은 function으로 불러온다.

const express = require('express') //require : 요구한다, express를 불러온다.
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express() //express의 일반적인 기능들의 모음


const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

// DB 연결
const dbAdress = ""


mongoose
    .connect(dbAdress) // 연결해라
    .then(() => console.log("mongodb connected ...")) // 정상적으로 연결이 되면 then으로 간다
    .catch(err => console.log(":::::::::::::::::::", err)) // 연결에 문제가 있으면 catch로 가라 



// 미들웨어 설정
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/product', productRoute)
app.use('/order', orderRoute) //order를 요청하면 orderRoute로 이동하겠다.


const port = 9999 //9999를 통해서 통신을 하겠다.

app.listen(port, console.log("server started"))
//listen(함수)-> app을 실행하겠다는 메서드(방법), port를 통해서만 실행하겠다.



