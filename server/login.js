const express = require('express')
const Router = express.Router()
const model = require('./model')
// 用户模块
const Employee = model.getModel('employee')



// 职员添加--用户注册
Router.post('/add',function(req,res){
  console.log(req.body,'========')
  let content = JSON.parse( Object.keys(req.body) )
  Employee.create(content,function(err,doc){
    if(!err){
      let msg = {
        code:200,
        msg:'添加成功',
        doc
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
// 用户的删除
Router.post('/del',function(req,res){
  let condition = JSON.parse(Object.keys(req.body))
  Employee.deleteOne(condition,function(err,doc){
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

// 全部职员获取
Router.get('/list',function(req,res){
  let condition = req.query
  Employee.find(condition,function(err,doc){
    return res.json(doc)
  })
})



// 职员登录请求
Router.post('/login',function(req,res){
  let condition = JSON.parse(Object.keys(req.body));
  Employee.findOne(condition,function(err,doc){
    if(doc){
      let msg ={
        code:200,
        msg:'登录成功',
        user:doc
      }
      return res.json(msg)
    }else{
      let msg ={
        code:-1,
        msg:'登录失败，密码或账号错误',
      }
      return res.json(msg)
    }
  })
})


module.exports = Router