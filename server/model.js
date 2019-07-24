const mongoose = require('mongoose')
// 链接mongo 并且使用touche这个集合
const DB_URL = 'mongodb://localhost:27017/touche'

mongoose.connect(DB_URL,{ useNewUrlParser: true })

const models = {
  "users":{
    "username":{type:String,"require":true},
    "number":{type:String,"require":true},
    "sex":{type:Number,"requier":true},
    "birthday":{type:String,"require":true},
    "married":{type:Number,"requier":true},
    "desc":{type:String,"require":true},
    "address":{type:String,"require":true},
  },
  "oders":{
    "number":{type:Number,"requier":true},
    "address":{type:String,"require":true},
    "startTime":{type:String},
    "endTime":{type:String},
    "currency":{type:String,"require":true},
    "desc":{type:String,"require":true},
    "commercial":{type:String,"require":true},
    "money":{type:Number,"require":true},
    "pass":{type:Number,"requier":true},
  },
  "financy":{
    "month":{type:String,"require":true},//月份
    "income":{type:Number,"require":true},//收入
    "expenditure":{type:Number,"require":true},//支出
  }
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}