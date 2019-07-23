import React from "react";
import { Button, Table, Modal, Form, Input, Icon ,Select } from "antd";
import "./supermo.scss";
const { Option } = Select
const columns = [
  {
    title: "角色ID",
    dataIndex: "name"
  },
  {
    title: "角色名称",
    dataIndex: "age"
  },
  {
    title: "创建时间",
    dataIndex: "address"
  },
  {
    title: "停用状态",
    dataIndex: "address"
  },
  {
    title: "授权时间",
    dataIndex: "address"
  },
  {
    title: "授权人",
    dataIndex: "address"
  }
];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
class SUperMo extends React.Component {
  state = {
    selectedRowKeys: [],
    visible: false
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  //   创建角色点击回调
  createrole = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: "all-data",
          text: "Select All Data",
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()] // 0...45
            });
          }
        },
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          }
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          }
        }
      ]
    };
    // form
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="supermo_page">
        <div className="role">
          <Button onClick={this.createrole}>创建角色</Button>
          <Button >设置权限</Button>
          <Button>用户授权</Button>
        </div>
        <Table
          bordered //边框
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data} // 数据源
        />
        <Modal
          title="创建角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={()=>{this.setState({ visible:false })}}
        >
          <Form>
            <Form.Item label="角色名称" labelCol={{span:6}} wrapperCol={{span: 16}} >
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入要创建的用户名" }],
                initialValue:'张三丰'
              },)(
                <Input
                  prefix={
                    <Icon type="user" />
                  }
                  placeholder="姓名"
                />
              )}
            </Form.Item>

            <Form.Item label="状态"  labelCol={{span:6}} wrapperCol={{span: 16}}>
              {getFieldDecorator("role", {
                initialValue:"开启"
              })(
                <Select
                  style={{ width: 150 }}
                >
                  <Option value="1">开启</Option>
                  <Option value="2">关闭</Option>
                 
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

SUperMo = Form.create(null)(SUperMo);
export default SUperMo;
