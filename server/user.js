const express = require('express')
const Router = express.Router()
const model = require('./model')
// 用户模块
const User = model.getModel('users')
// 用户数据请求
Router.get('/list',function(req,res){
  let condition = req.query
  User.find(condition,function(err,doc){
    return res.json(doc)
  })
})
// 用户的添加
Router.post('/add',function(req,res){
  let params = JSON.parse( Object.keys(req.body))
  User.create(params,function(err,doc){
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
// 用户资料的的修改
Router.post('/updata',function(req,res){
  let number = JSON.parse( Object.keys(req.body))._id
  let content = JSON.parse( Object.keys(req.body)).content
  User.updateOne({_id:number},{ '$set':content},function(err,doc){
    if(doc.nModified>0){
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

// 用户的删除
Router.get('/del',function(req,res){
  let condition = req.query
  User.deleteOne(condition,function(err,doc){
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
// 用户删除完成


module.exports = Router