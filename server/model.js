const mongoose = require('mongoose')
// 链接mongo 并且使用touche这个集合
const DB_URL = 'mongodb://localhost:27017/touche'

mongoose.connect(DB_URL,{ useNewUrlParser: true })

const models = {
  "users":{
    "username":{type:String,"require":true},
    "password":{type:String,"require":true},
    "type":{type:String,"require":true},
    "avater":{type:String,"require":true},
    "desc":{type:String,"require":true},
    "role":{type:String,"require":true}
  },
  "oders":{
    "number":{type:Number,"requier":true},
    "address":{type:String,"require":true},
    "startTime":{type:String,"require":true},
    "endTime":{type:String,"require":true},
    "currency":{type:String,"require":true},
    "desc":{type:String,"require":true},
    "commercial":{type:String,"require":true},
    "money":{type:Number,"require":true},
  },
  "financy":{
    "month":{type:String,"require":true},
    "income":{type:Number,"require":true},
    "expenditure":{type:Number,"require":true},
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