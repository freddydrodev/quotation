import React, { Component } from "react";
import { Table, Button } from "antd";
import _ from "lodash";
import SectionCard from "../Common/SectionCard/SectionCard";
import TableInputs from "../Common/TableInputs/TableInputs";

export default class InitialCost extends Component {
  state = {
    limit: 1,
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
        item: "--",
        description: "Description",
        quantity: 0,
        unit: "Unit",
        price: 0,
        amount: 0,
        comment: "Comment"
      },
      {
        key: "1",
        item: "--",
        description: "Consumption Tax",
        quantity: 1,
        unit: "8%",
        price: 39240,
        amount: 0,
        comment: "no comment"
      }
    ],
    columns: [
      {
        title: "Item",
        dataIndex: "item",
        key: "item",
        width: 100,
        render: (value, rec, index) => {
          if (index === this.state.limit) {
            return {
              children: (
                <Button type="dashed" block onClick={this.addRowHandler}>
                  Add a new row
                </Button>
              ),
              props: {
                colSpan: 7
              }
            };
          } else {
            return <b>{value}</b>;
          }
        }
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (prevValue, rec, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return (
            <TableInputs
              data={{ prevValue, fieldType: "description", fieldPos: index }}
              change={this.change}
              type="text"
            />
          );
        },
        width: 200
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (prevValue, rec, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return (
            <TableInputs
              data={{ prevValue, fieldType: "quantity", fieldPos: index }}
              change={this.change}
              type="number"
            />
          );
        },
        width: 100
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        render: (prevValue, rec, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return (
            <TableInputs
              data={{ prevValue, fieldType: "unit", fieldPos: index }}
              change={this.change}
              type="select"
            />
          );
        },
        width: 100
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (prevValue, rec, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return (
            <TableInputs
              data={{ prevValue, fieldType: "price", fieldPos: index }}
              change={this.change}
              type="number"
            />
          );
        },
        width: 100
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount, { price, quantity }, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return <i>{price * quantity || 0}</i>;
        },
        width: 100
      },
      {
        title: "Comment",
        dataIndex: "comment",
        key: "comment",
        render: (prevValue, rec, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return (
            <TableInputs
              data={{ prevValue, fieldType: "comment", fieldPos: index }}
              change={this.change}
              type="text"
            />
          );
        },
        width: 200
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

  change = (value, index, type) => {
    const dataSource = [...this.state.dataSource];
    dataSource[index][type] = value;

    this.setState({ dataSource });
  };

  addRowHandler = () => {
    const count = this.state.count;
    const limit = this.state.limit;
    const _dataSource = [...this.state.dataSource];
    const { length } = _dataSource;
    const lastest = _dataSource.splice(length - 2, length);

    _dataSource.push(this.template(count));
    const dataSource = _.flatten(_.concat(_dataSource, lastest));

    this.setState({ dataSource, count: count + 1, limit: limit + 1 });
  };

  componentDidMount() {
    this.limit = this.state.dataSource.length - 2;
  }

  render() {
    const { dataSource, columns } = this.state;
    return (
      <SectionCard sectionTitle="Initial Cost Details">
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
      </SectionCard>
    );
  }
}
