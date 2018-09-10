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
    ]
  };

  change = (value, index, type) => {
    const dataSource = [...this.state.dataSource];
    dataSource.forEach(el => {
      if (el.key === index) {
        el[type] = value;
      }
    });
    this.setState({ dataSource });
    this.props.getCost(this.props.section, this.sendData());
  };

  addRowHandler = () => {
    const count = this.state.count + 1;
    const limit = this.state.limit + 1;
    const _dataSource = [...this.state.dataSource];
    const { length } = _dataSource;
    const lastest = _dataSource.splice(length - this.endElementsLength, length);

    _dataSource.push(this.generateTemplate(this.props.columns, count));
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
    const { dataSource } = this.state;
    this.endElementsLength = 2; //btn + tax
    const _dataSource = [...dataSource];

    //remove tax row
    if (this.props.removeTax) {
      _dataSource.pop();
      this.endElementsLength = 1; //btn only
    }

    //put remote date into the list
    const finalSource = [...this.props.dataSource, ..._dataSource];
    const limit = this.props.dataSource.length;
    const finalColumns = this.generateColumns(this.props.columns);

    //updating data
    this.setState(
      { dataSource: finalSource, columns: finalColumns, limit },
      () => {
        this.props.getCost(this.props.section, this.sendData());
      }
    );
  }

  generateTemplate = (columns, count) => {
    const key = [...columns].map(col => col.name.toLowerCase());
    const val = key.map((e, i) => {
      return i === 0
        ? `${count}`
        : columns[i].type === "number"
          ? 0
          : `${e}-${count}`;
    });
    const out = _.zipObject(key, val);

    return { key: `${parseInt(val[0]) + 1}`, ...out, option: "--" };
  };

  generateColumns = columns => {
    const len = [...columns].length;
    const gen = [...columns].map(
      ({ name, type, notEditable, width, renderer, noIndex }, i) => {
        const dataIndex = name.toLowerCase();
        const title = name;
        const inputType = type || "text";

        return {
          title,
          dataIndex,
          sorter: (a, b) => {
            if (
              a.description !== "add btn" &&
              b.description !== "add btn" &&
              a.description !== "Consumption Tax" &&
              b.description !== "Consumption Tax"
            ) {
              if (type === "number") {
                return a[dataIndex] < b[dataIndex] ? 1 : -1;
              }
              return a[dataIndex].length < b[dataIndex].length ? 1 : -1;
            }
          },
          width: width || null,
          render: (prevValue, rec, index) => {
            //if we met the index
            if (i === 0 && !noIndex) {
              //expand col and append button if we met its position
              if (index === this.state.limit) {
                return {
                  children: (
                    <Button type="dashed" block onClick={this.addRowHandler}>
                      Add a new row
                    </Button>
                  ),
                  props: {
                    colSpan: len + 1
                  }
                };
              }

              //otherwise just display the data
              else {
                return <b>{prevValue}</b>;
              }
            }

            //if the field is not editable
            if (notEditable) {
              //remove the col to let the btn span
              if (index === this.state.limit) {
                return {
                  props: {
                    colSpan: 0
                  }
                };
              }
              return renderer ? (
                //for custom renderer
                renderer(prevValue, rec, index)
              ) : (
                //default rendering
                <i>{prevValue}</i>
              );
            }

            // if it's editable then we just call conditionalRenderer func
            if (index === this.state.limit) {
              return {
                props: {
                  colSpan: 0
                }
              };
            }

            return (
              <TableInputs
                data={{ prevValue, fieldType: dataIndex, fieldPos: rec.key }}
                change={this.change}
                type={inputType}
              />
            );
          }
        };
      }
    );

    //add option
    gen.push({
      title: "Option",
      dataIndex: "option",
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
    });

    this.generateTemplate(columns, this.state.count);
    return gen;
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
