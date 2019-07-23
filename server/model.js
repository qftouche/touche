const mongoose = require('mongoose')
// 链接mongo 并且使用touche这个集合
const DB_URL = 'mongodb://localhost:27017/touche'

mongoose.connect(DB_URL)

const model = {
  'users':{
    'username':{type:String,'require':true},
    'password':{type:String,'require':true},
    'type':{type:String,'require':true},
    'avater':{type:String,'require':true},
    'desc':{type:String,'require':true},
    'role':{type:String,'require':true}
  }
}

for(let m in models){
  mongoose.model(m,new mongoose.Schema(model[m]))
}


module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}