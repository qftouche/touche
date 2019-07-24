import React from "react";
import {
  Card,
  Button,
  Table,
  Form,
  Input,
  Checkbox,
  Select,
  Radio,
  Icon,
  message,
  Modal,
  DatePicker
} from "antd";

import { connect } from "react-redux";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class User extends React.Component {
  state = {
    list: [],
    isVisible:false
  };

  params = {
    page: 1
  };

  componentDidMount() {}

  // 操作员工
  handleOperator = type => {
    let item = this.state.selectedItem;
    if (type == "create") {
      this.setState({
        title: "创建员工",
        isVisible: true,
        type
      });
    } else if (type == "edit" || type == "detail") {
      if (!item) {
        Modal.info({
          title: "信息",
          content: "请选择一个用户"
        });
        return;
      }
      this.setState({
        title: type == "edit" ? "编辑用户" : "查看详情",
        isVisible: true,
        userInfo: item,
        type
      });
    } else if (type == "delete") {
      if (!item) {
        Modal.info({
          title: "信息",
          content: "请选择一个用户"
        });
        return;
      }
    }
  };

  render() {
    const columns = [
      {
        title: "员工姓名",
        dataIndex: "id"
      },
      {
        title: "编号",
        dataIndex: "username"
      },
      {
        title: "性别",
        dataIndex: "sex",
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "员工描述",
        dataIndex: "state",
        render(state) {
          let config = {
            "1": "咸鱼一条",
            "2": "风华浪子",
            "3": "北大才子一枚",
            "4": "百度FE",
            "5": "创业者"
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render(interest) {
          let config = {
            "1": "游泳",
            "2": "打篮球",
            "3": "踢足球",
            "4": "跑步",
            "5": "爬山",
            "6": "骑行",
            "7": "桌球",
            "8": "麦霸"
          };
          return config[interest];
        }
      },
      {
        title: "婚姻状况",
        dataIndex: "isMarried",
        render(isMarried) {
          return isMarried ? "已婚" : "未婚";
        }
      },
      {
        title: "生日",
        dataIndex: "birthday"
      },
      {
        title: "联系地址",
        dataIndex: "address"
      }
    ];
    return (
      <div>
        <Card>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登 录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.handleOperator("create")}
          >
            创建员工
          </Button>
          <Button icon="edit" onClick={() => this.handleOperator("edit")}>
            编辑员工
          </Button>
          <Button onClick={() => this.handleOperator("detail")}>
            员工详情
          </Button>
          <Button
            type="danger"
            icon="delete"
            onClick={() => this.handleOperator("delete")}
          >
            删除员工
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            columns={columns}
            // selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            // pagination={this.state.pagination}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={()=>{
            this.handleSubmit()
          }}
          width={800}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false
            });
          }}
        >
          <UserForm
            userInfo={this.state.userInfo}
            type={this.state.type}
            wrappedComponentRef={inst => (this.userForm = inst)}
          />
        </Modal>
      </div>
    )
  }
  handleSubmit=()=>{
      this.userForm.props.form.validateFields((errors, values) => {
         if(!errors){
          console.log(values)
         }
      })
      
  }
}

export default connect()(User)
class UserForm extends React.Component {
  componentDidMount(){
   
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };

    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator("user_name", {
            rules: [{ required: true, message: "员工姓名为必填项" }]
          })(<Input type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="编号" {...formItemLayout}>
          {getFieldDecorator("code")(<Input/>)}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {getFieldDecorator("sex", {
            initialValue: 1
          })(
            <RadioGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="是否婚育" {...formItemLayout}>
          {getFieldDecorator("ismarried", {
            initialValue: 1
          })(
            <RadioGroup>
              <Radio value={1}>未婚</Radio>
              <Radio value={2}>已婚</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="员工描述" {...formItemLayout}>
          {getFieldDecorator("state", {
            initialValue: 1
          })(
            <Select>
              <Option value={1}>帅气逼人</Option>
              <Option value={2}>风华浪子</Option>
              <Option value={3}>浪荡佳人</Option>
              <Option value={4}>风华绝代</Option>
              <Option value={5}>美貌如花</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {getFieldDecorator("birthday")(<DatePicker />)}
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "联系地址是必填项" }]
          })(<Input.TextArea rows={3} placeholder="请输入联系地址" />)}
        </FormItem>
      </Form>
    );
  }
 
}
UserForm = Form.create({})(UserForm);
