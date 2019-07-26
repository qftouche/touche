import React from 'react'
import { Row,Col } from "antd"
import './index.scss'
import Util from '../../utils/utils'
import store from './../../store'
import { connect } from 'react-redux'
class Header extends React.Component{
    state={
        avator:"/assets/timg.jpg"
    }
    componentWillMount(){
        this.setState({
            userName:'洗脚真嗨啊',
        })
        setInterval(()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime:sysTime,
            })
        },1000)
    }

    userOut(){
        localStorage.removeItem('user')
        window.location.reload();
    }

    render(){
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={menuType?18:24} className="logo1">
                        <img src={this.state.avator} alt=""/>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#" onClick={this.userOut}>退出</a>
                    </Col>
                </Row>
                {/* {
                    menuType?'': */}
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {this.props.menuName}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src="/assets/sun.jpg" alt="" />
                                    {/* <img src={this.state.dayPictureUrl} alt="" /> */}
                                </span>
                                <span className="weather-detail">
                                    {/* {this.state.weather} */}
                                    多雲转晴
                                </span>
                            </Col>
                        </Row>
                {/* } */}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        menuName: state.head.menu,
    }
};
const mapDispacthToProps = dispatch=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispacthToProps)(Header)