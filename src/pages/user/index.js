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
  DatePicker,
  Popconfirm
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
    type: "", //当前是创建员工还是编辑
    isVisibledetail:false // 详情
  };

  // 操作员工
  handleOperator = type => {
    let item = this.state.selectedRows.length;
    if (type == "create") {
      this.setState({
        title: "创建员工",
        isVisible: true,
        type
      });
      return ;
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
        title: '编辑用户',
        isVisible: true,
        type
      });
      return;
    } else if (type == "delete") {
      if (item === 0) {
        Modal.info({
          title: "信息",
          content: "请选择一个用户"
        });
        return;
      } else if (item > 1) {
        message.warning("请选择一位用户");
        return;
      }
     let id = this.state.selectedRows[0]._id;
     this.props.DeleteONE(id)
    } else if ( type === 'detail' ){
      // 显示详情
      this.setState({
        isVisibledetail: true
      })
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
        dataIndex: "username"
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
        dataIndex: "desc",
        render : (state)=>{
          const  stateNow={
            1 : '离职',
            2 : '在职',
            3 : '待业',
            4 : '随时到岗'
          }
          return stateNow[state]
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
          <Popconfirm
            title="你确定要删除这条数据吗"
            okText="是的"
            cancelText="再想想"
            onConfirm={() => this.handleOperator("delete")}
          >
            <Button
              type="danger"
              icon="delete"
            >
              删除员工
            </Button>
          </Popconfirm>
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
        {/* 显示页面详细信息 */}
        <Modal
          title="员工详情信息"
          width="100%"
          visible={this.state.isVisibledetail}
          onOk={()=>{this.setState({ isVisibledetail : false  })}}
          onCancel={()=>{this.setState({ isVisibledetail : false  })}}
        >
         <Table
            columns={columns} // 表格配置
            dataSource={this.state.selectedRows} //数据源
          />
      </Modal>
      </div>
    );
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  handleSubmit = type => {
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
      this.userForm.props.form.validateFields((errors, values) => {
        if (!errors) {
          let id = this.state.selectedRows[0]._id;
          this.props.UpdataOne(values, id);
          this.setState({
            isVisible: false
          });
          return;
        }
      });
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
      },
      UpdataOne: (values, id) => {
        dispatch(actions.UpdataOne(values, id));
      },
      DeleteONE:(id)=>{
        dispatch(actions.DeleteONE(id))
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
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "员工姓名为必填项" }],
            initialValue: userInfo ? userInfo.username : ""
          })(<Input type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="编号" {...formItemLayout}>
          {getFieldDecorator("number", {
            initialValue: userInfo ? userInfo.number : ""
          })(<Input />)}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {getFieldDecorator("sex", {
            initialValue: userInfo ? userInfo.sex : 1
          })(
            <RadioGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="是否婚育" {...formItemLayout}>
          {getFieldDecorator("ismarried", {
            initialValue: userInfo ? userInfo.married : 1
          })(
            <RadioGroup>
              <Radio value={1}>未婚</Radio>
              <Radio value={2}>已婚</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="员工描述" {...formItemLayout}>
          {getFieldDecorator("desc", {
            initialValue: userInfo ? userInfo.state : 1
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
            initialValue: userInfo ? userInfo.address : ""
          })(<Input.TextArea rows={3} placeholder="请输入联系地址" />)}
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create({})(UserForm);
