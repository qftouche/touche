import React from "react";
import "./index.scss";
import Chart from "chart.js";
import { connect } from "react-redux";
import {getFinance} from './../../store/modules/financy/actionCreates'
import store from './../../store'

class Fined extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:null
    }
  }




  componentDidMount() {
    // 挂载的时候请求数据，派发一个动作
    this.props.getFinanceData()
  }
  componentDidUpdate(){
    let data = this.props.data
    var month = data.map((item)=>{
      return item.month
    })
    // 收入数组
    var income = data.map( item=>{
      return item.income
    })
    let quarter = []//季度收入
    if(income){
      var quaSum=0;
      for(var i=0;i<income.length;i++){
        quaSum+=income[i];
        if( (i+1)%3===0 ){
          quarter.push(quaSum);
          quaSum=0;
        }
      }
    }
    // 支出数组
    var expenditure = data.map( item=>{
      return item.expenditure
    })
    
    
        // 条形图start
        var ctx = document.getElementById("myChart");
        var mixedChart = new Chart(ctx, {
          type: "bar",
          data: {
            datasets: [
              {
                label: "季度收支利润表",
                data: [4700, 5200, 4900, 6100],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              },
              {
                label: "利润",
                data: [3200, 1200, 2800, 2750],
                type: 'line',
                fill:false,
                // Changes this dataset to become a line
                // type: "line"
              }
            ],
            labels: ["第一季度", "第二季度", "第三季度", "第四季度"]
          },
          options: {
            elements: {
              line: {
                  tension: 0 // disables bezier curves
              }
            },
    
          }
        });
        // 条形图start
    
        // 饼图
        var ctx = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            datasets: [{
              data: [43.96, 57.04],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
            }],
          },
          options: {
            title: {
              display: true,
              text: '全年利润占比：47.19%',
              position:'bottom'
            }
          }
      });
    
      // 饼图end
      // 底部条形图
      var bottomCtx = document.getElementById("bottomChart");
      var bottomChart = new Chart(bottomCtx, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "收入",
              data: income,
              backgroundColor: [
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
                'rgba(154, 190, 188, 0.6)',
              ],
            },
            {
              label: "支出",
              data: expenditure,
            },
          ],
          labels: month
        },
        options: {
          elements: {
            line: {
                tension: 0 // disables bezier curves
            }
          },
          title: {
            display: true,
            text: '月收支对比',
            position:'top'
          },
          scales: {
            xAxes: [{
                gridLines: false
            }]
        }
        }
      });
      // 底部条形图
  }
  render() {
    let data = this.props.data

// 收入计算
    var income = data.map( item=>{
      return item.income
    })
    let quarter = []//季度收入
    let halfYear = []//半年收入
    if(income){
      var quaSum=0;
      var QYsum = 0;
      for(var i=0;i<income.length;i++){
        quaSum+=income[i];
        QYsum+=income[i]
        if( (i+1)%3===0 ){
          quarter.push(quaSum);
          quaSum=0;
        }
        if( (i+1)%6===0 ){
          halfYear.push(QYsum);
          QYsum=0
        }
      }
    }
    // 全年收入
    var yearIncome =  halfYear[0] + halfYear[1];
    // 支出计算
    var expenditure = data.map( item=>{
      return item.expenditure
    })
    let quaExpend = []//季度收入
    let quaHalfYearExpend = []//半年收入
    if(income){
      var quaExpendSum=0;
      var QYExpendSum = 0;
      for(var i=0;i<expenditure.length;i++){
        quaExpendSum+=expenditure[i];
        QYExpendSum+=expenditure[i]
        if( (i+1)%3===0 ){
          quaExpend.push(quaExpendSum);
          quaSum=0;
        }
        if( (i+1)%6===0 ){
          quaHalfYearExpend.push(QYExpendSum);
          QYExpendSum=0
        }
      }
    }
    // 全年支出
    var yearExpend =  quaHalfYearExpend[0] + quaHalfYearExpend[1];
    return (
      <div className="wrap-finance">
        <div className="wrap-table">
          <div className="table-top">
            <div className="table-topLeft">
              <table style={{ border: "1", width: "100%" }}>
                <tbody>
                  <tr>
                    <td colSpan="7">
                      <h3 className="thead">xxx公司财务报表</h3>
                    </td>
                  </tr>
                  <tr className="first-row">
                    <td></td>
                    <td>收入</td>
                    <td>支出</td>
                    <td></td>
                    <td>收入</td>
                    <td>支出</td>
                    <td>时间</td>
                  </tr>
                  <tr>
                    <td>1月份</td>
                    <td>{data[0] ? data[0].income : ''}</td>
                    <td>{data[0] ? data[0].expenditure:''}</td>
                    <td>一季度</td>
                    <td>{quarter[0] ? quarter[0]:''}</td>
                    <td>{quaExpend[0]?quaExpend[0]:''}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2月份</td>
                    <td>{data[0] ? data[1].income : ''}</td>
                    <td>{data[0] ? data[1].expenditure:''}</td>
                    <td>二季度</td>
                    <td>{quarter[0] ? quarter[1]:''}</td>
                    <td>{quaExpend[0]?quaExpend[1]:''}</td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td>3月份</td>
                    <td>{data[0] ? data[2].income : ''}</td>
                    <td>{data[0] ? data[2].expenditure:''}</td>
                    <td>三季度</td>
                    <td>{quarter[0] ? quarter[2]:''}</td>
                    <td>{quaExpend[0]?quaExpend[2]:''}</td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td>4月份</td>
                    <td>{data[0] ? data[3].income : ''}</td>
                    <td>{data[0] ? data[3].expenditure:''}</td>
                    <td>四季度</td>
                    <td>{quarter[0] ? quarter[2]:''}</td>
                    <td>{quaExpend[0]?quaExpend[3]:''}</td>
                    <td>  </td>
                  </tr>
                  <tr>
                    <td>5月份</td>
                    <td>{data[0] ? data[4].income : ''}</td>
                    <td>{data[0] ? data[4].expenditure:''}</td>
                    <td colSpan="4" />
                  </tr>
                  <tr>
                    <td>6月份</td>
                    <td>{data[0] ? data[5].income : ''}</td>
                    <td>{data[0] ? data[5].expenditure:''}</td>
                    <td rowSpan="2" className="whiteWord" valign="middle">
                      <span>上半年</span>
                    </td>
                    <td rowSpan="2">{halfYear[0]?halfYear[0]:''}</td>
                    <td rowSpan="2">{quaHalfYearExpend[0]?quaHalfYearExpend[0]:''}</td>
                    <td rowSpan="2"></td>
                  </tr>
                  <tr>
                    <td>7月份</td>
                    <td>{data[0] ? data[6].income : ''}</td>
                    <td>{data[0] ? data[6].expenditure:''}</td>
                  </tr>
                  <tr>
                    <td>8月份</td>
                    <td>{data[0] ? data[7].income : ''}</td>
                    <td>{data[0] ? data[7].expenditure:''}</td>
                    <td rowSpan="2" className="whiteWord">
                      <span>下半年</span>
                    </td>
                      <td rowSpan="2">{halfYear[0]?halfYear[1]:''}</td>
                      <td rowSpan="2">{quaHalfYearExpend[0]?quaHalfYearExpend[1]:''}</td>
                      <td rowSpan="2"></td>
                  </tr>
                  <tr>
                    <td>9月份</td>
                    <td>{data[0] ? data[8].income : ''}</td>
                    <td>{data[0] ? data[8].expenditure:''}</td>
                  </tr>
                  <tr>
                    <td>10月份</td>
                    <td>{data[0] ? data[9].income : ''}</td>
                    <td>{data[0] ? data[9].expenditure:''}</td>
                    <td colSpan="4" />
                  </tr>
                  <tr>
                    <td>11月份</td>
                    <td>{data[0] ? data[10].income : ''}</td>
                    <td>{data[0] ? data[10].expenditure:''}</td>
                    <td rowSpan="2" className="whiteWord">
                      <span>全年收入</span>
                    </td>
                    <td rowSpan="2">{yearIncome?yearIncome:''}</td>
                    <td rowSpan="2">{yearExpend?yearExpend:''}</td>
                    <td rowSpan="2"></td>
                  </tr>
                  <tr>
                    <td>12月份</td>
                    <td>{data[0] ? data[11].income : ''}</td>
                    <td>{data[0] ? data[11].expenditure:''}</td>
                  </tr>
                </tbody>
              </table>
          </div>
            <div className="table-topRight">
              <div className="table-topRight-top">
                <canvas id="myChart" style={{ width: "80%", height: "80%" }} />
              </div>
              <div className="table-topRight-bottom">
                <canvas id="myPieChart" style={{ width: "80%", height: "80%" }} />
              </div>
            </div>
          </div>
          <div className="table-bottom">
          <canvas id="bottomChart" style={{ width: "80%", height: "80%" }} />
          </div>
      </div>
    </div>
    );
  }
}

export default connect( (state)=>{
  return {
    data:state.financy.financy_data
  }
},(dispatch)=>{
  return {
    getFinanceData(){
      dispatch( getFinance() )
    }
  }
}  )(Fined);
