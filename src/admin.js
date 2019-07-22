import React from 'react';
import { Row,Col } from 'antd';
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import './style/common.scss'
import './admin.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Audit from "./pages/order/index";
import Execu from "./pages/order/execu";
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
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
  );
 }
}

export default connect()(Admin);
