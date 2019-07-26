import axios from "axios";


const actions = {
  initorder: () => {
    return (dispatch, getstate) => {
      axios.get("http://10.36.140.222:9090/oders/list?pass=1").then(res => {
        if (res.status === 200) {
          let data = res.data;
          dispatch({
            type: "initorderlist",
            data
          });
        }
      });
    };
  },
  Delectorder: id => {
    // 将订单的状态改变
    let data = JSON.stringify({ _id: id, content: { pass: 2 } });
    return (dispatch, getstate) => {
      axios.post(`http://10.36.140.222:9090/oders/updata`, data)
      .then(res => {
        if (res.data.code == 200) {
          dispatch({
            type: "delectorder",
            id
          })
        }
      })
    }
  },
  findOfcity:cityname=>{
    return (dispatch,getstate)=>{
      axios.get(`http://10.36.140.222:9090/oders/list?pass=1&address=${ cityname }`)
      .then(res=>{
        let findcitylist = res.data;
        dispatch({
          type:'findlist',
          findcitylist
        })
      })
    }
  },
  Overorderlist:()=>{   // 结束订单页所显示的数据
    return (dispatch, getstate) => {
      axios.get("http://10.36.140.222:9090/oders/list?pass=2").then(res => {
        if (res.status === 200) {
          let data = res.data;
          dispatch({
            type: "initoverlist",
            data
          });
        }
      });
    };
  }
};

export default actions;
