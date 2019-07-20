import React from 'react';
import { Row,Col } from 'antd';
import { connect } from 'react-redux'
import './'
class Head extends React.Component{
 render(){
  return (
    <div className='header'>
      头部
    </div>
  );
 }
}

export default connect()(Head);
