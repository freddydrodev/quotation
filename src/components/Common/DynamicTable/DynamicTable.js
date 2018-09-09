import React, { Component } from "react";
import { Table, Button } from "antd";
import _ from "lodash";
import TableInputs from "../TableInputs/TableInputs";

const MAX_COLUMNS = 20;

export default class DynamicTable extends Component {
  state = {
    limit: 0,
    count: 0,
    dataSource: [
      {
        key: "1",
        item: "--",
        description: "add btn",
        quantity: 0,
        unit: "Unit",
        price: 0,
        amount: 0,
        comment: "Comment",
        option: ""
      },
      {
        key: "0",
        item: "--",
        description: "Consumption Tax",
        quantity: 1,
        unit: "8%",
        price: 39240,
        amount: 0,
        comment: "no comment",
        option: ""
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
                colSpan: 8
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
        render: (prevValue, rec, index) =>
          this.conditionalRenderer(prevValue, index, "description", "text"),
        width: 200
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (prevValue, rec, index) =>
          this.conditionalRenderer(prevValue, index, "quantity", "number"),
        width: 100
      },
      {
        title: "Unit",
        dataIndex: "unit",
        key: "unit",
        render: (prevValue, rec, index) =>
          this.conditionalRenderer(prevValue, index, "unit", "select"),
        width: 100
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (prevValue, rec, index) =>
          this.conditionalRenderer(prevValue, index, "price", "number"),
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
        render: (prevValue, rec, index) =>
          this.conditionalRenderer(prevValue, index, "comment", "text"),
        width: 200
      },
      {
        title: "Option",
        dataIndex: "option",
        key: "option",
        width: 80,
        render: (a, b, index) => {
          if (index === this.state.limit) {
            return {
              props: {
                colSpan: 0
              }
            };
          }
          return (
            <Button
              size="small"
              type="danger"
              icon="delete"
              block
              onClick={() => this.removeRowHandler(index)}
            />
          );
        }
      }
    ]
  };

  template = count => {
    return {
      key: `${count + 2}`,
      item: `${count}`,
      description: `Description ${count}`,
      quantity: 0,
      unit: `Unit ${count}`,
      price: 0,
      amount: 0,
      comment: `Comment ${count}`,
      option: ""
    };
  };

  change = (value, index, type) => {
    const dataSource = [...this.state.dataSource];
    dataSource[index][type] = value;
    this.setState({ dataSource });
    this.props.getCost(this.props.section, this.sendData());
  };

  addRowHandler = () => {
    const count = this.state.count + 1;
    const limit = this.state.limit + 1;
    const _dataSource = [...this.state.dataSource];
    const { length } = _dataSource;
    const lastest = _dataSource.splice(length - 2, length);

    _dataSource.push(this.template(count));
    const dataSource = _.flatten(_.concat(_dataSource, lastest));

    this.setState({ dataSource, count, limit }, () => {
      this.props.getCost(this.props.section, this.sendData());
    });
  };

  sendData = () => {
    const data = [...this.state.dataSource];
    data.splice(this.state.limit, this.state.dataSource.length - 1);

    const dataSource = data.map(({ key, ...rest }) => ({
      ...rest,
      amount: rest.price * rest.quantity
    }));

    this.props.setData(dataSource);
    return dataSource;
  };

  removeRowHandler = index => {
    if (index < this.state.limit) {
      const limit = this.state.limit - 1;
      const dataSource = [...this.state.dataSource];
      dataSource.splice(index, 1);

      this.setState({ dataSource, limit }, () => {
        this.props.getCost(this.props.section, this.sendData());
      });
    }
  };

  componentDidMount() {
    const dataSource = [...this.state.dataSource, ...this.props.dataSource];
    const columns = this.props.columns
      ? this.props.columns
      : this.state.columns;
    this.setState({ dataSource, columns });
  }

  conditionalRenderer = (prevValue, index, fieldType, inputType) => {
    if (index === this.state.limit) {
      return {
        props: {
          colSpan: 0
        }
      };
    }

    return (
      <TableInputs
        data={{ prevValue, fieldType, fieldPos: index }}
        change={this.change}
        type={inputType}
      />
    );
  };

  render() {
    const { columns, dataSource } = this.state;

    return (
      <Table
        pagination={{
          defaultPageSize: MAX_COLUMNS
        }}
        style={{ marginTop: 15 }}
        className="tables"
        bodyStyle={{ paddingLeft: 0 }}
        size="small"
        dataSource={dataSource}
        columns={columns}
      />
    );
  }
}
