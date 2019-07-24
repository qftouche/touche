const express = require('express')
const model = require('./model')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const financyRouter = require('./financy')
const oderRouter = require('./oder')

// 新建app
const app =express()


// 中间件
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 路由
app.use('/oders',oderRouter);
app.use('/financy',financyRouter)
app.use('/user',userRouter)

app.listen(9090,function(){
  console.log('Node app start at port 9090')
})
