import React from 'react';
import { Row,Col } from 'antd';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import './style/common.less'
import './admin.less'



class Admin extends React.Component{
 render(){
  return (
    <Row className="container">
                <Col span={4} className="nav-left">
                    <div>这里写左边组件</div>
                </Col>
                <Col span={20} className="main">
                <div>这里写头部组件</div>
                    <Row className="content">
                        <div>这里写内容组件</div>
                    </Row>
                    <div>这里写页脚组件</div>
                </Col>
            </Row>
  );
 }
}

export default connect()(Admin);
