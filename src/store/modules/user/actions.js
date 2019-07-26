import axios from "axios";
const actions = {
  AddUser: values => {
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
            dispatch({
              type: "adduser",
              userlist:values
            });
          }
        });
    };
  },
  getUser:()=>{
      return (dispatch,getstate)=>{
          axios.get('http://10.36.140.222:9090/user/list')
          .then(res=>{
              console.log(res.data)
            let userlist=res.data
            console.log(userlist)
            dispatch({
                type: "initlist",
                userlist
              });
          })
      }
  }
};

export default actions
