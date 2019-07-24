import React from "react";
import "./index.scss";
import actions from "../../store/modules/order/actionse";

import {
  Table,
  Button,
  Form,
  Select,
  Radio,
  Input,
  DatePicker,
  Modal,
  message
} from "antd";

import { connect } from "react-redux";
import { Store } from "tough-cookie";

const FormItem = Form.Item;

const columns = [
  {
    title: "姓名/商户名称",
    dataIndex: "commercial"
  },
  {
    title: "订单号",
    dataIndex: "number"
  },
  {
    title: "开始时间",
    dataIndex: "startTime"
  },
  {
    title: "结束时间",
    dataIndex: "endTime"
  },
  {
    title: "币种",
    dataIndex: "currency"
  },
  {
    title: "订单金额",
    dataIndex: "money"
  },
  {
    title: "订单描述",
    dataIndex: "desc"
  },
  {
    title: "操作",
    render: () => {
      return (
        <div>
          <Button>通过审核</Button>
          <Button>修改订单</Button>
          <Button type="danger">删除订单</Button>
        </div>
      );
    }
  }
];


class Audit extends React.Component {
  state = {
    loading: false,
    visible: false
  };
 componentDidMount(){ 
   this.props.getinitorder()
 }

  render() {
    return (
      <div className="order_page">
        <h1>提交订单信息核准表</h1>
        <p>尊敬的客户您的订单详情具体如下：</p>
        <Button type="primary" onClick={() => { this.setState({ visible:true }) }} className="addorder">
          添加订单
        </Button>
        <Modal
          title="创建订单"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({
              visible: false
            });
          }}  
        >
          <UserForm wrappedComponentRef={(form) => this.UserForm = form} />
        </Modal>
        <div className="list_cont">
          <Table bordered={true} columns={columns} dataSource={this.props.data} rowKey={1}/>
        </div>
      </div>
    );
  }
  handleOk=()=>{
    this.UserForm.props.form.validateFields((errors, values) => {
      if(!errors){
        this.props.getdata(values)
        message.success('添加成功');
        this.setState({
          visible: false  
        });
      }
    });
  }
}

export default connect(
  state=>{
    return{
      data:state.order.orderlist
    }
  },
  (dispatch)=>{
    return{
     getdata:(values)=>{
       dispatch(actions.addorder(values))
     },
     getinitorder:()=>{
       dispatch( actions.getorderlist() )
     } 
    }
  }
)(Audit);
class UserForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };

    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator("commercial", {
            rules: [{ required: true, message: "员工姓名为必填项" }]
          })(<Input type="text" placeholder="请输入客户姓名" />)}
        </FormItem>
        <FormItem label="订单号" {...formItemLayout}>
          {getFieldDecorator("number", {
            rules: [{ required: true, message: "员工姓名为必填项" }]
          })(<Input type="text" placeholder="请输入订单号" />)}
        </FormItem>
        <FormItem label="城市名称" {...formItemLayout}>
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "员工姓名为必填项" }]
          })(<Input type="text" placeholder="请输入城市名称" />)}
        </FormItem>
        <FormItem label="开始时间" {...formItemLayout}>
          {getFieldDecorator("startTime", {
            rules: [{ required: true, message: "员工姓名为必填项" }]
          })(<Input type="text" placeholder="请输入开始时间" />)}
        </FormItem>
        <FormItem label="期望结束时间" {...formItemLayout}>
          {getFieldDecorator("endTime", {
            rules: [{ required: true, message: "必填" }]
          })(<Input type="text" placeholder="请输入结束时间" />)}
        </FormItem>
        <FormItem label="币种" {...formItemLayout}>
          {getFieldDecorator("currency", {
            rules: [{ required: true, message: "" }]
          })(<Input type="text" placeholder="请输入使用币种" />)}
        </FormItem>
        <FormItem label="订单金额" {...formItemLayout}>
          {getFieldDecorator("money", {
            rules: [
              { required: true, message: "员工姓名为必填项" },
           
            ]
          })(<Input type="text" placeholder="请输入订单金额" />)}
        </FormItem>
        <FormItem label="订单说明" {...formItemLayout}>
          {getFieldDecorator("desc", {
            rules: [{ required: true, message: "请填写订单说明" }]
          })(<Input.TextArea rows={3} placeholder="请说明此订单详情" />)}
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create({})(UserForm);
