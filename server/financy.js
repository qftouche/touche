const express = require('express')
const Router = express.Router()
const model = require('./model')
// 员工模块
const financyRouter = model.getModel('financy')
// 员工数据请求
Router.get('/list',function(req,res){
  financyRouter.find({},function(err,doc){
    return res.json(doc)
  })
})


module.exports = Router