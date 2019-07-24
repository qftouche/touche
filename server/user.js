const express = require('express')
const Router = express.Router()
const model = require('./model')
// 员工模块
const User = model.getModel('users')
// 员工数据请求
Router.get('/list',function(req,res){
  User.find({},function(err,doc){
    return res.json(doc)
  })
})
// 员工的添加
Router.get('/add',function(req,res){
  let params = req.query
  console.log(params)
  return res.json(params)
  // oderRouter.create(params,function(err,doc){
  //   if(!err){
  //     let msg = {
  //       code:200,
  //       msg:'添加成功'
  //     }
  //     return res.json()
  //   }else{
  //     let msg = {
  //       code:-1,
  //       msg:'添加失败'
  //     }
  //     return res.json()
  //   }
  // })
})

// 员工资料的的修改
Router.get('/list',function(req,res){
  let number = req.query(number)
  let condition = {number:req.number}
  // let content = 
  oderRouter.update({'user':'小华'},{ '$set':{age:100}},function(err,doc){
    console.log(doc)
  })
})

module.exports = Router