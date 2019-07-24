import axios from "axios";
const actions = {
  addorder: values => {
    return (dispatch, getstate) => {
      axios
        .post("http://10.36.140.222:9090/oders/add", JSON.stringify(values))
        .then(res => {
          if(res.data.code===200){
            // message('添加成功') 提示信息 添加成功
        
            let values=res.config.data;
            values=JSON.parse(values)
            dispatch({
                type:'addorder',
                values
            })
          }
        });
    };
  },
  getorderlist:()=>{
      return (dispatch,getstate)=>{
          axios.get('http://10.36.140.222:9090/oders/list')
          .then(res=>{
             
              if(res.status===200){
                let data = res.data;
                console.log( data )
                dispatch({
                    type:'initorderlist',
                    data
                })
              }
          })
      }
  }
};

export default actions;
