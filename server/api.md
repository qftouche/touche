
#后台接口

###oders
  ------|-----------------------------------|----------------------|
        |      地址                                  参数
  查询  | http://localhost:9090/orders/list |number=订单（number类型）   get
  ------|-----------------------------------|----------------------|
  添加  | http://localhost:9090/orders/add      params                  post
  ------|-----------------------------------|----------------------|
  修改  | http://localhost:9090/orders/updata |      params         |   post

  **添加的params:params={
    "number":{type:Number,"requier":true},//订单号
    "address":{type:String,"require":true},//地址，城市
    "startTime":{type:String,"require":true},//开始时间
    "endTime":{type:String,"require":true},//结束时间
    "currency":{type:String,"require":true},//币种
    "desc":{type:String,"require":true},//订单说明
    "commercial":{type:String,"require":true},//商户名称
    "money":{type:Number,"require":true},//订单金额
  }
  
  ****修改的的params:params={
    number："要修改的订单号",
    content:{//对象形式
      修改内容，对象形式，只需添加格式中的要修改的内容添加进来就可以
    }
  }**
 **修改项提供订单号，及修改内容，**


