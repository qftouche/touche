import React from "react";
import "./index.scss";

import { List, message, Button } from "antd";

class Audit extends React.Component {
  state = {
    data: [
      { title: "订单号", id: "1", message: 123 },
      { title: "订单时间", id: "2", message: "2019/12/12" },
      { title: "商户名称", id: "3", message: "神户一条龙" },
      { title: "订单币种", id: "4", message: "人民币" },
      { title: "订单金额", id: "5", message: 800 },
      { title: "订单说明", id: "6", message: "用户网上子订单" },
      { title: "所在城市", id: "7", message: "北京" }
    ],
    loading: false
  };

  render() {
    return (
      <div className="order_page">
        <h1>提交订单信息核对表</h1>
        <p>尊敬的xxx客户您的订单详情具体如下：</p>
        <div className="list_cont">
          <List
            split={true}
            bordered={true} //是否有边框线
            dataSource={this.state.data} //数据源
            renderItem={item => {
              return (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={<span>{item.title}</span>}
                    description={item.email}
                  />
                  <div>{item.message}</div>
                </List.Item>
              );
            }}
          />
        </div>
        <div className="subcommit">
          <Button>确定提交订单</Button>
          <Button type="danger">不予审核</Button>
        </div>
      </div>
    );
  }
}

export default Audit;
