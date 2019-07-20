import React from 'react';
import { Row,Col, Divider } from 'antd';
import { connect } from 'react-redux'
class NavLeft extends React.Component{
 render(){
  return (
   <div>左边栏目</div>
  );
 }
}

export default connect()(NavLeft);
