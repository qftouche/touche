import React from 'react'
import { Row,Col } from "antd"
import './index.scss'
import Util from '../../utils/utils'
// import axios from '../../axios'
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
        // this.getWeatherAPIData();
    }

    // getWeatherAPIData(){
    //     let city = '北京';
    //     axios.jsonp({
    //         url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    //     }).then((res)=>{
    //         if(res.status == 'success'){
    //             let data = res.results[0].weather_data[0];
    //             this.setState({
    //                 dayPictureUrl:data.dayPictureUrl,
    //                 weather:data.weather
    //             })
    //         }
    //     })
    // }
    render(){
        const { menuName, menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {/* {
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>IMooc 通用管理系统</span>
                            </Col>:''
                    } */}
                    <Col span={menuType?18:24} className="logo1">
                        <img src={this.state.avator} alt=""/>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {/* {
                    menuType?'': */}
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {/* {menuName || '首页'} */}
                                首页
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
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)