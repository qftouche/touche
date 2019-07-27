import React from "react";
import { connect } from "react-redux";
import actions from "../../store/modules/execu/actions";
import { Form, Select, Button, DatePicker, Table, Modal, message } from "antd";
import "./execu.scss";
const { Option } = Select;
const { RangePicker } = DatePicker;
  
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
  }
];

class EXecu extends React.Component {
  state = {
    selectedRowKeys: [], //当前选中的table框的下标
    loading: false,
    checkselectAll: [], //被选中的数据
    id: [] //被选中的当前的id
  };
  start = type => {
    if (type === "danger") {
      if (this.state.id.length > 1) {
        message.warning("结束订单一次最多选择一个");
        return;
      }
      this.props.Delectorder(this.state.id[0]); // props接收一个函数 并且执行
      message.success("订单完成，已经帮您结束，可在执行完毕查看！");
    } else if (type === "primary") {
      setTimeout(() => {
        this.info();
      }, 500);
    }
    this.setState({ loading: true });
    this.setState({
      selectedRowKeys: [],
      loading: false
    });
  };
  onSelectChange = (selectedRowKeys, selectrows) => {
    let idList = selectrows.map(element => {
      return element._id;
    });
    this.setState({ selectedRowKeys, checkselectAll: selectrows, id: idList });
  };
  render() {
    let { getFieldDecorator } = this.props.form;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0; // 判断现在是否有点击选择框
    return (
      <div className="execu_page">
        <div className="execu_select_page">
          <Form layout="inline">
            <Form.Item label="城市选择">
              {getFieldDecorator("select",{initialValue:''})(
                <Select style={{ width: "200px" }}>
                  <Option value="">全部城市</Option>
                  {this.props.cityList.map((item, index) => {
                    return (
                      <Option value={index} key={index}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>

            <div className="button_top">
              <Button
                type="primary"
                onClick={() => {
                  this.Find();
                }}
              >
                查询
              </Button>
              
            </div>
          </Form>
        </div>
        <div className="execu_table_page">
          <div className="execu_table_head">
            <Button
              type="primary"
              onClick={() => {
                this.start("primary");
              }}
              disabled={!hasSelected}
              loading={loading}
            >
              订单详情
            </Button>
            <Button
              type="danger"
              onClick={() => {
                this.start("danger");
              }}
              disabled={!hasSelected}
              loading={loading}
            >
              结束订单
            </Button>
          </div>
          <div className="execu_table_bot">
            <div>
              <div style={{ marginBottom: 16, marginLeft: 16 }}>
                <span style={{ marginLeft: 8 }}>
                  {hasSelected ? `选择了 ${selectedRowKeys.length} 条` : ""}
                </span>
              </div>
              <Table
                rowKey={record => record.uid}
                bordered={true}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.orderlist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  Find(){
    this.props.form.validateFields((err,values)=>{
      let index=values.select
     let cityname = this.props.cityList[index] || '';
     this.props.Findofcity( cityname )   // 执行props函数 将所选中的城市数据传下去
     let length=this.props.orderlist.length
     message.success(`一共查询到${length}条数据`)
    })
  }
  componentDidMount() {
    this.props.initorder();
  }

  info = () => {
    // 弹出显示框 显示当前选中信息
    Modal.info({
      title: "当前选中的订单信息是",
      width: "100%",
      content: (
        <div>
          <Table
            rowKey={record => record.uid}
            bordered={true}
            columns={columns}
            dataSource={this.state.checkselectAll}
          />
        </div>
      )
    });
  };
}

EXecu = Form.create(null)(EXecu);

export default connect(
  state => {
    return {
      cityList: state.neworder.citylist,
      orderlist: state.neworder.orderlist
    };
  },
  (dispatch, props) => {
    return {
      initorder: () => {
        dispatch(actions.initorder());
      },
      Delectorder: id => {
        dispatch(actions.Delectorder(id));
      },
      Findofcity:(cityname)=>{
        dispatch(actions.findOfcity(cityname))
      }
    };
  }
)(EXecu);
