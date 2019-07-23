import React from "react"
import { Table } from 'antd';
import "./finish.scss";
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `张 ${i}`,
    age: 32,
    address: `每条数据 ${i}`,
  });
}
class Finish extends React.Component{
    state = {
        selectedRowKeys: [], // Check here to configure the default column
      };
    
      onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
              text: 'Select All Data',
              onSelect: () => {
                this.setState({
                  selectedRowKeys: [...Array(46).keys()], // 0...45
                });
              },
            },
            {
              key: 'odd',
              text: 'Select Odd Row',
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
              text: 'Select Even Row',
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
              <h1>已经完成的订单</h1>
              <div >

              </div>
             <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>  
        )
    }
}   
export default Finish

