import React, { Component } from "react";
import { Table, Button } from "antd";
import _ from "lodash";
import SectionCard from "../Common/SectionCard/SectionCard";

export default class InitialCost extends Component {
  state = {
    count: 4,
    editable: true,
    units: [],
    dataSource: [
      {
        key: "3",
        item: "1",
        description: "Description",
        quantity: 5,
        unit: "Unit",
        price: 10,
        amount: 0,
        comment: "Comment"
      },
      {
        key: "2",
        item: "NaN",
        name: "Btn",
        age: 40,
        address: "asdk asdkljhsad"
      },
      {
        key: "1",
        item: "NaN",
        name: "Last",
        age: 40,
        address: "asdk asdkljhsad"
      }
    ],
    columns: [
      {
        title: "Item",
        dataIndex: "item",
        key: "item"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: desc => <i>textarea {desc}</i>
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: qty => <i>input num {qty}</i>
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        render: unit => <i>select opt {unit}</i>
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: price => <i>inp num {price}</i>
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount, { price, quantity }, index) => {
          return <i>dynamic para {price * quantity}</i>;
        }
      },
      {
        title: "Comment",
        dataIndex: "comment",
        key: "comment",
        render: cmt => <i>textarea {cmt}</i>
      }
    ]
  };

  template = count => {
    const txt = count - 2;
    return {
      key: `${count}`,
      item: `${txt}`,
      description: `Description ${txt}`,
      quantity: 0,
      unit: `Unit ${txt}`,
      price: 0,
      amount: 0,
      comment: `Comment ${txt}`
    };
  };

  addRowHandler = () => {
    const count = this.state.count;
    const _dataSource = [...this.state.dataSource];
    const { length } = _dataSource;
    const lastest = _dataSource.splice(length - 2, length);

    _dataSource.push(this.template(count));
    const dataSource = _.flatten(_.concat(_dataSource, lastest));

    this.setState({ dataSource, count: count + 1 });
  };

  render() {
    const { dataSource, columns } = this.state;
    return (
      <SectionCard sectionTitle="Initial Cost Details">
        <Button onClick={() => console.log(this.state.dataSource)}>data</Button>
        <Table
          pagination={{
            defaultPageSize: 20
          }}
          style={{ marginTop: 15 }}
          className="tables"
          bodyStyle={{ paddingLeft: 0 }}
          size="small"
          dataSource={dataSource}
          columns={columns}
        />
        <Button type="dashed" block icon="plus" onClick={this.addRowHandler}>
          Add a new row
        </Button>
      </SectionCard>
    );
  }
}
