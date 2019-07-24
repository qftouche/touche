const express = require('express')
const Router = express.Router()
const model = require('./model')
// 员工模块
const financyRouter = model.getModel('financy')
// 财务数据请求数据请求
Router.get('/list',function(req,res){
  financyRouter.find({},function(err,doc){
    return res.json(doc)
  })
})
// 添加数据
Router.post('/add',function(req,res){
  let params = JSON.parse( Object.keys(req.body));
  financyRouter.create(params,function(err,doc){
    if(!err){
      let msg = {
        code:200,
        msg:'添加成功'
      }
      return res.json(msg)
    }else{
      let msg = {
        code:-1,
        msg:'添加失败'
      }
      return res.json(msg)
    }
  })
})


module.exports = Router