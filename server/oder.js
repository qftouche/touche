const express = require('express')
const Router = express.Router()
const model = require('./model')
// 订单模块
const oderRouter = model.getModel('oders')
// 订单数据请求=====================完成
Router.get('/list',function(req,res){
  let condition = req.query
  console.log(condition)
  oderRouter.find(condition,function(err,doc){
    return res.json(doc)
  })
})
// 订单添加==============================完成
Router.post('/add',function(req,res){
  let params = JSON.parse( Object.keys(req.body))
  oderRouter.create(params,function(err,doc){
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
// 订单的修改
Router.post('/updata',function(req,res){
  let number = JSON.parse( Object.keys(req.body)).number
  let content = JSON.parse( Object.keys(req.body)).content
  // let content = 
  oderRouter.update({number},{ '$set':content},function(err,doc){
    if(!err){
      let msg = {
        code:200,
        msg:'修改成功'
      }
      return res.json(msg)
    }else{
      let msg = {
        code:-1,
        msg:'修改失败'
      }
      return res.json(msg)
    }
  })
})

// 订单的删除
Router.get('/del',function(req,res){
  let condition = req.query
  oderRouter.remove(condition,function(err,doc){
    if(!err){
      let msg = {
        code:200,
        msg:'删除成功'
      }
      return res.json(msg)
    }else{
      let msg = {
        code:-1,
        msg:'删除失败'
      }
      return res.json(msg)
    }
  })
})
// 订单删除完成


module.exports = Router