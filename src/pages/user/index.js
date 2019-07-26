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
import actions from "../../store/modules/user/actions";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class User extends React.Component {
  state = {
    list: [],
    isVisible: false,
    selectedRowKeys: [], //被选中的当前的下标
    selectedRows: [], //被选中的当前所在的值的集合
    type: "" //当前是创建员工还是编辑
  };

  // 操作员工
  handleOperator = type => {
    let item = this.state.selectedRows.length;
    console.log(item)
    if (type == "create") {
      this.setState({
        title: "创建员工",
        isVisible: true,
        type
      });
    } else if (type == "edit") {
      if (item === 0) {
        Modal.info({
          title: "信息",
          content: "请选择一个用户"
        });
        return;
      } else if (item > 1) {
        message.warning("只能选择一条信息进行编辑");
        return;
      }
      this.setState({
        title: type == "edit" ? "编辑用户" : "查看详情",
        isVisible: true,
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
    let { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const columns = [
      {
        title: "员工姓名",
        dataIndex: "user_name"
      },
      {
        title: "编号",
        dataIndex: "number"
      },
      {
        title: "性别",
        dataIndex: "sex",
        render(sex) {
          return sex == 1 ? "男" : "女";
        }
      },
      {
        title: "目前状态",
        dataIndex: "state"
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
            columns={columns} // 表格配置
            dataSource={this.props.userlist} //数据源
            rowSelection={rowSelection} //表格的选择框
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={() => {
            this.handleSubmit(this.state.type);
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
            userInfo={this.state.selectedRows}
            type={this.state.type}
            wrappedComponentRef={inst => (this.userForm = inst)}
          />
        </Modal>
      </div>
    );
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  handleSubmit = type => {
    // 弹框的处理事件回调
    if (type === "create") {
      // 创建员工
      this.userForm.props.form.validateFields((errors, values) => {
        if (!errors) {
          this.props.AddUser(values);
          message.success("添加成功");
          this.setState({
            isVisible: false
          });
        }
      });
      return;
    }
    if (type === "edit") {
      // 编辑员工
      console.log("编辑员工走进来了");
      this.userForm.props.form.validateFields((errors, values) => {
        

      })
    }
  };

  componentDidMount() {
    this.props.getUser();
  }
}

export default connect(
  state => {
    return {
      userlist: state.user.userlist
    };
  },
  dispatch => {
    return {
      AddUser: values => {
        dispatch(actions.AddUser(values));
      },
      getUser: () => {
        dispatch(actions.getUser());
      }
    };
  }
)(User);
class UserForm extends React.Component {
  render() {
    let userInfo = this.props.userInfo[0];
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {getFieldDecorator("user_name", {
            rules: [{ required: true, message: "员工姓名为必填项" }],
            initialValue: userInfo?userInfo.username:''
          })(<Input type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="编号" {...formItemLayout}>
          {getFieldDecorator("code", {
            initialValue: userInfo?userInfo.number:''
          })(<Input />)}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {getFieldDecorator("sex", {
            initialValue: userInfo? userInfo.sex : 1
          })(
            <RadioGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="是否婚育" {...formItemLayout}>
          {getFieldDecorator("ismarried", {
            initialValue: userInfo? userInfo.married : 1
          })(
            <RadioGroup>
              <Radio value={1}>未婚</Radio>
              <Radio value={2}>已婚</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="员工描述" {...formItemLayout}>
          {getFieldDecorator("state", {
            initialValue: userInfo ? userInfo.state :  1
          })(
            <Select>
              <Option value={1}>离职</Option>
              <Option value={2}>在职</Option>
              <Option value={3}>待业</Option>
              <Option value={4}>随时到岗</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {getFieldDecorator("birthday")(<DatePicker />)}
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "联系地址是必填项" }],
            initialValue: userInfo? userInfo.address :  ""
          })(<Input.TextArea rows={3} placeholder="请输入联系地址" />)}
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create({})(UserForm);
