import React from 'react';
import { connect } from 'react-redux'
import './index.scss'

class Footer extends React.Component{
 render(){
  return (
    <div className="footer">
      <p>版权所有：偷车小分队（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：切格瓦拉</p>
    </div>
  );
 }
}

export default connect()(Footer);
