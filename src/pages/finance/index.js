import React from "react";
import "./index.scss";
import Chart from "chart.js";

class Fined extends React.Component {
  componentDidMount() {
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
          data: [1000,2000,1600,2000,2000,1300,1400,1200,2100,2000,1900,2200,2100],
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
          data: [400,600,800,1200,2100,800,500,900,700,1300,800,1500,1400],
        },
      ],
      labels: ["一月", "二月",, "三月", "四月","五月","六月","七月","八月","九月","十月","十一月","十二月",]
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
                    <td />
                    <td>收入</td>
                    <td>支出</td>
                    <td />
                    <td>收入</td>
                    <td>支出</td>
                    <td>时间</td>
                  </tr>
                  <tr>
                    <td>1月份</td>
                    <td />
                    <td />
                    <td>一季度</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>2月份</td>
                    <td />
                    <td />
                    <td>二季度</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>3月份</td>
                    <td />
                    <td />
                    <td>三季度</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>4月份</td>
                    <td />
                    <td />
                    <td>四季度</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>5月份</td>
                    <td />
                    <td />
                    <td colSpan="4" />
                  </tr>
                  <tr>
                    <td>6月份</td>
                    <td />
                    <td />
                    <td rowSpan="2" className="whiteWord" valign="middle">
                      <span>上半年</span>
                    </td>
                    <td rowSpan="2" />
                    <td rowSpan="2" />
                    <td rowSpan="2" />
                  </tr>
                  <tr>
                    <td>7月份</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>8月份</td>
                    <td />
                    <td />
                    <td rowSpan="2" className="whiteWord">
                      <span>下半年</span>
                    </td>
                    <td rowSpan="2" />
                    <td rowSpan="2" />
                    <td rowSpan="2" />
                  </tr>
                  <tr>
                    <td>9月份</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>10月份</td>
                    <td />
                    <td />
                    <td colSpan="4" />
                  </tr>
                  <tr>
                    <td>11月份</td>
                    <td />
                    <td />
                    <td rowSpan="2" className="whiteWord">
                      <span>全年收入</span>
                    </td>
                    <td rowSpan="2" />
                    <td rowSpan="2" />
                    <td rowSpan="2" />
                  </tr>
                  <tr>
                    <td>12月份</td>
                    <td />
                    <td />
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

export default Fined;
