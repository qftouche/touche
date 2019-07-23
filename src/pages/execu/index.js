import React from "react";
import { connect } from "react-redux";
import { Form, Select, Button, DatePicker, Table } from "antd";
import "./execu.scss";
const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
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
class EXecu extends React.Component {
  state = {
    cityList: [
      { py: "beijing", city: "北京" },
      { py: "shanghai", city: "上海" },
      { py: "guangzhou", city: "广州" },
      { py: "shenzheng", city: "深圳" }
    ],
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    let { getFieldDecorator } = this.props.form;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,  
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className="execu_page">
        <div className="execu_select_page">
          <Form layout="inline">
            <Form.Item label="城市选择">
              {getFieldDecorator("select", {
                rules: [{ require: true, message: "请选择您要搜索的城市" }]
              })(
                <Select style={{ width: "80px" }}>
                  <Option value="all">全部城市</Option>
                  {this.state.cityList.map((item, index) => {
                    return (
                      <Option value={item.py} key={index}>
                        {item.city}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="请选择日期">
              {getFieldDecorator("range_time", {})(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </Form.Item>
            <Form.Item label="订单状态">
              {getFieldDecorator("status", {})(
                <Select style={{ width: "80px" }}>
                  <Option value="all">全部</Option>
                  <Option value="Nottodo">结束行程</Option>
                  <Option value="doing">正在进行中</Option>
                </Select>
              )}
            </Form.Item>
             <div className="button_top">
               <Button type="primary">查询</Button>
               <Button type="danger">重置</Button>
             </div>
          </Form>
        </div>
        <div className="execu_table_page">
          <div className="execu_table_head">
            <Button type="primary">订单详情</Button>
            <Button type="danger">结束订单</Button>
          </div>
          <div className="execu_table_bot">
            <div>
              <div style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  onClick={this.start}
                  disabled={!hasSelected}
                  loading={loading}
                >
                  Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected
                    ? `选择了 ${selectedRowKeys.length} 条`
                    : ""}
                </span>
              </div>
              <Table
                bordered={true}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EXecu = Form.create(null)(EXecu);

export default connect(state => {
  return {
    cityList: state.cityList
  };
})(EXecu);
