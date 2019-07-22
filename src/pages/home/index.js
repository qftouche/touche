import React from 'react';
import './index.scss'
import home from './../../resource/images/home/home.jpg'
function Home() {
  return (
    <div className="home-wrap">
      <div className="home-img">
        <img src={home} alt=""/>
        <h4>要么拿车，要么拿命</h4>
      </div>
    </div>
  );
}

export default Home;
