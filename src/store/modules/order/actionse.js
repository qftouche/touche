import axios from "axios";
const actions = {
  addorder: values => {
    return (dispatch, getstate) => {
      axios
        .post("http://10.36.140.222:9090/oders/add", JSON.stringify({...values,pass:0}))
        .then(res => {
          if(res.data.code===200){
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
          axios.get('http://10.36.140.222:9090/oders/list?pass=0')
          .then(res=>{
              if(res.status===200){
                let data = res.data;
                dispatch({
                    type:'initorderlist',
                    data
                })
              }
          })
      }
  },
  passorder:(id,values)=>{
   let data = JSON.stringify({_id:id,content:{pass:1,...values}});
    return (dispatch,getstate)=>{
       axios.post(`http://10.36.140.222:9090/oders/updata`,
         data 
       ).then(res=>{
           if(res.data.code==200){
              dispatch({
                type:'delectone',
                 id
              })
           }
       }) 
    }   
  },
  Delectone:(id)=>{
      return (dispatch,getstate)=>{
         axios.get(`http://10.36.140.222:9090/oders/del?_id=${id}`)
         .then(res=>{
             if(res.data.code===200){
               // 删除成功
               dispatch({
                   type:'delectone',
                   id
               })  
             }
         }) 
      }
  }
};

export default actions;
