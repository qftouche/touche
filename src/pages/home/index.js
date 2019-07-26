import React from "react";
import "./index.scss";
import home from "./../../resource/images/home/bg1.jpg";

import { Icon, Carousel } from "antd";
const imglist = [];
for (let i = 0; i < 3; i++) {
  imglist.push(home);
}
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
