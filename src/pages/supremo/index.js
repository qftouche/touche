import React from "react";
import Highlighter from "react-highlight-words";
import { userRegist,userList,delU } from "./../../store/modules/regist/actionCreates";
import store from "./../../store";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Icon,
  SelectCheckbox,
  Select,
  Radio,
  Row,
  Col
} from "antd";
import "./supermo.scss";
import { connect } from "react-redux";

const { Option } = Select;

class SUperMo extends React.Component {
  state = {
    selectedRowKeys: [],
    visible: false,
    searchText: "",
    data: []
  };


  componentDidMount(){
    this.props.getData()
  }
  //   创建角色点击回调
  createrole = () => {
    this.setState({
      visible: true
    });
  };
  // 提交数据
  handleOk = (e,value) => {
    this.setState({
      visible: false
    });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.Regist(values);
      }
    });
    
  };


  // 列表的内容====================================================
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "部门",
        dataIndex: "department",
        key: "department",
        width: "20%",
        ...this.getColumnSearchProps("department")
      },
      {
        title: "工号",
        dataIndex: "number",
        key: "number",
        ...this.getColumnSearchProps("number")
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        render: (row) => (
          <div>
            <Button type="primary" onClick={()=>{
              this.createrole(row)
            }}>编辑</Button>
            <Button type="danger" onClick={()=>{this.props.delUser(row.key)}}>删除</Button>
          </div>
        ),
      }
    ];
    // form
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="supermo_page">
        <div className="role">
          <Button onClick={this.createrole}>添加员工</Button>
        </div>
        <Modal
          title="创建角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        >
          <Form>
            {/* 用户名 */}
            <Form.Item
              label="职员账户"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入要创建的用户名" }],
                initialValue: "张三丰"
              })(<Input prefix={<Icon type="user" />} placeholder="姓名" />)}
            </Form.Item>
            {/* 密码*/}
            <Form.Item
              label="账户密码"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请输入账户的密码"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            {/* 密码结束 */}
            {/* 部门选择 */}
            <Form.Item 
            label="部门"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("post", {
                rules: [
                  { required: true, message: "Please select your gender!" }
                ]
              })(
                <Select
                  placeholder="请选择员工所属部门"
                  onChange={this.handleSelectChange}
                >
                  <Option value="财务部">财务</Option>
                  <Option value="人力资源部">人力</Option>
                  <Option value="经理 ">经理</Option>
                  <Option value="客户服务部">客服</Option>
                </Select>
              )}
            </Form.Item>
            {/* 部门选择结束 */}
            {/* 权限选择 */}
            <Form.Item label="管理权限">
              {getFieldDecorator("jurisdiction", {
                initialValue: "0"
              })(
                <Radio.Group name="radiogroup">
                <Radio value={0}>经理</Radio>
                <Radio value={1}>财务</Radio>
                <Radio value={2}>人力</Radio>
                <Radio value={3}>客服</Radio>
              </Radio.Group>
            )}
            </Form.Item>

            {/* 权限选择结束 */}
          </Form>
        </Modal>
        <Table columns={columns} dataSource={this.props.data} />
      </div>
    );
  }
}

SUperMo = Form.create(null)(SUperMo);
export default connect(
  state => {
    return {
      employee: state.regist.employee,
      data:state.regist.data
    };
  },
  dispatch => {
    return {
      Regist(value) {
        dispatch(userRegist(value));
      },
      getData(){
        dispatch(userList());
      },
      delUser(value){
        dispatch( delU(value) )
      }
    };
  }
)(SUperMo);
