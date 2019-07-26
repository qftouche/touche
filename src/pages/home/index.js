import React from "react";
import "./index.scss";
import che1 from "./../../resource/images/home/che1.jpg";
import che2 from "./../../resource/images/home/che2.jpg";
import che3 from "./../../resource/images/home/che3.jpg";

import { Icon, Carousel } from "antd";
const imglist = [];
imglist.push(che1);
imglist.push(che2);
imglist.push(che3);

class Home extends React.Component {
    prev=()=>{
      this.refs.auto.prev();
    }
    next=()=>{
      this.refs.auto.next();
    }
  render() {
    return (
      <div className="home-wrap">
        <div className="home-img">
          <Carousel autoplay dots={true} ref='auto'>
            {imglist.map((item, index) => {
              return (
                <div key={index}>
                    <img src={item} alt="" />
                </div>
              );  
            })} 
          </Carousel>
          <Icon
            type="left-circle"
            className="prev"
            style={{ fontSize: "50px", color: "#ccc" }}
            onClick={ this.prev}
          />
          <Icon
            type="right-circle"
            className="next"
            style={{ fontSize: "50px", color: "#ccc" }}
            onClick={ this.next }
          />
        </div>
      </div>
    );
  }
}

export default Home;
