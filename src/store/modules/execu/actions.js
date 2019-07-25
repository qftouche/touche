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
  }
};

export default actions;
