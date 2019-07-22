import React from 'react';
import { Row,Col } from 'antd';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import './style/common.scss'
import './admin.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'



class Admin extends React.Component{
 render(){
  return (
    <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span={20} className="main">
                <Header/>
                    <Row className="content">
                        <div>这里写内容组件</div>
                    </Row>
                    <Footer />
                </Col>
            </Row>
  );
 }
}

export default connect()(Admin);
