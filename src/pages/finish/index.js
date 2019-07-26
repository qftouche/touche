import React from "react"
import { Table } from 'antd';
import "./finish.scss";
import { connect } from "react-redux";
import actions from "../../store/modules/execu/actions";
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

class Finish extends React.Component{
    state = {
        selectedRowKeys: [], 
      };
    
      onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
      };
    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          columnWidth:'40px',
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          selections: [
            {   
              key: 'all-data',
              text: '选择全部',
              onSelect: () => {
                this.setState({
                  selectedRowKeys: [...Array(46).keys()], // 0...45
                });
              },
            },
            {
              key: 'odd',
              text: '选择奇数行',
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return false;
                  }
                  return true;
                });
                this.setState({ selectedRowKeys: newSelectedRowKeys });
              },
            },
            {
              key: 'even',
              text: '选择偶数行',
              onSelect: changableRowKeys => {
                let newSelectedRowKeys = [];
                newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                  if (index % 2 !== 0) {
                    return true;
                  }
                  return false;
                });
                this.setState({ selectedRowKeys: newSelectedRowKeys });
              },
            },
          ],
        };
        return (
          <div className="finish_page">
              <h1>所有完成的订单</h1>
             <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.data} />
          </div>  
        )
    }
    componentDidMount(){  // 初始化数据
      this.props.Overorderlist()
    }
} 

export default connect(
  state=>{
    return {
      data:state.neworder.Overorderlist
    }
  },
  (dispatch)=>{
    return{
      Overorderlist:()=>{
        dispatch( actions.Overorderlist() )
      }
    }
  }
)(Finish)

