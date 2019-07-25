import React from "react";
import { connect } from "react-redux";
import actions from "../../store/modules/execu/actions";
import { Form, Select, Button, DatePicker, Table,Modal } from "antd";
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
    dataIndex: "desc",
  }
];

class EXecu extends React.Component {
  state = {
    cityList: [
      { py: "beijing", city: "北京" },
      { py: "shanghai", city: "上海" },
      { py: "guangzhou", city: "广州" },
      { py: "shenzheng", city: "深圳" }
    ],
    selectedRowKeys: [], //当前选中的table框的下标
    loading: false,       
    checkselectAll:[],   //被选中的数据
    id:[]                //被选中的当前的id
  };
  start = (type) => {
    if(type==='danger'){
      console.log(1)
      
      console.log( this.state.id )
    } else if( type === 'primary' ) {
     setTimeout(()=>{ this.info()},500)
    }
    this.setState({ loading: true });
    this.setState({
      selectedRowKeys: [],
      loading: false
    });
  };
  onSelectChange = (selectedRowKeys,selectrows) => {
   
   let a= selectrows.map(element => {
       return element._id
    });
    console.log ( a)
    this.setState({ selectedRowKeys,checkselectAll:selectrows });
  };
  render() {
    let { getFieldDecorator } = this.props.form;
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;  // 判断现在是否有点击选择框
    return (
      <div className="execu_page">
        <div className="execu_select_page">
          <Form layout="inline">
            <Form.Item label="城市选择">  
              {getFieldDecorator("select")(
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
            <Button
              type="primary"
              onClick={()=>{ this.start('primary') }}
              disabled={!hasSelected}
              loading={loading}
            >
              订单详情
            </Button>
            <Button
              type="danger"
              onClick={()=>{ this.start('danger') }}
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
                  {hasSelected ? `选择了 ${selectedRowKeys.length} 条` : 0}
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

  componentDidMount() {
    this.props.initorder();
  }

   info=()=>{ // 弹出显示框 显示当前选中信息
    
    Modal.info({
      title: '当前选中的订单信息是',
      width:'100%',
      content: (
        <div>
           <Table
              rowKey={record => record.uid}
              bordered={true}
              columns={columns}
             dataSource={this.state.checkselectAll}
            />
        </div>
      ),
     
    });
  }
}

EXecu = Form.create(null)(EXecu);

export default connect(
  state => {
    return {
      cityList: state.cityList,
      orderlist: state.neworder.orderlist
    };
  },
  (dispatch, props) => {
    return {
      initorder: () => {
        dispatch(actions.initorder());
      }
    };
  }
)(EXecu);

