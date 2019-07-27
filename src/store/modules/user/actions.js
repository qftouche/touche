import { message } from "antd";
import axios from "axios";
const actions = {
  AddUser: values => {  // 添加
    return (dispatch, getstate) => {
      axios
        .post(
          "http://10.36.140.222:9090/user/add",
          JSON.stringify({ ...values })
        )
        .then(res => {
          if (res.data.code === 200) {
            let values = res.config.data;
            values = JSON.parse(values);
            dispatch(actions.getUser());
          }
        });
    };
  },
  getUser:()=>{  // 初始化
      return (dispatch,getstate)=>{
          axios.get('http://10.36.140.222:9090/user/list')
          .then(res=>{
            let userlist=res.data;
            dispatch({
                type: "initlist",
                userlist
              });
          })
      }
  },
  UpdataOne:(values,id)=>{  // 修改
    return (dispatch,getstate)=>{
      let data = JSON.stringify({_id:id,content:{...values}});
      axios.post("http://10.36.140.222:9090/user/updata",data)
      .then(res=>{
        if(res.data.code===200){
          // 修改成功
          message.success("编辑成功")
         let data=JSON.parse( res.config.data )  // 修改之后的数据
         console.log(data)
         dispatch( actions.getUser() );
        }
      })
    }
  },
  DeleteONE:(id)=>{
     return (dispatch)=>{
       axios.get(`http://10.36.140.222:9090/user/del?_id=${id}`)
       .then(res=>{
         if(res.data.code===200){
           message.success("删除成功")
            dispatch( actions.getUser() )
         }
       })
     }
  }
};

export default actions
