import React from "react";
import "./index.scss";

import { Table, Button } from "antd";

const columns = [
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "订单号",
    dataIndex: "age"
  },
  {
    title: "操作",
    render: () => {
      return (
        <div>
          <Button>通过审核</Button>
          <Button type="danger">删除订单</Button>
        </div>
      );
    }
  }
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

class Audit extends React.Component {
  state = {
    loading: false
  };

  render() {
    return (
      <div className="order_page">
        <h1>提交订单信息核准表</h1>
        <p>尊敬的xxx客户您的订单详情具体如下：</p>
        <div className="list_cont">
          <Table bordered={true} columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}

export default Audit;
