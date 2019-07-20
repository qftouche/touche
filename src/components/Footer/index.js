import React from 'react';
import { Row,Col } from 'antd';
import { connect } from 'react-redux'
class Footer extends React.Component{
 render(){
  return (
    <div>脚部内容栏目</div>
  );
 }
}

export default connect()(Footer);
