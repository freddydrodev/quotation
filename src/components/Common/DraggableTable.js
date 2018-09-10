import React, { Component } from "react";
import { Table } from "antd";
import SortableJS from "sortablejs";

export default class DraggableTable extends Component {
  state = {
    dataSource: [
      { key: "1", id: "1", name: "freddy" },
      { key: "2", id: "2", name: "junior" },
      { key: "3", id: "3", name: "diomande" },
      { key: "4", id: "4", name: "dro" }
    ],
    columns: [
      { dataIndex: "id", title: "Id" },
      { dataIndex: "name", title: "Name" }
    ]
  };

  componentDidMount() {
    const dataSource = [...this.state.dataSource].sort(
      (a, b) => (+a.id < +b.id ? -1 : 1)
    );

    this.setState({ dataSource });
    this.sortable = new SortableJS(
      document.querySelector(".DraggableTable tbody"),
      {
        group: "DraggableTable",
        onSort: evt => {
          this.updateIndex(evt.oldIndex, evt.newIndex);
        }
      }
    );
  }

  updateIndex = (oldIndex, newIndex) => {
    const dataSource = [...this.state.dataSource];
    if (dataSource[oldIndex].key && dataSource[newIndex].key) {
      const el = dataSource.splice(oldIndex, 1);
      dataSource.splice(newIndex, 0, el[0]);

      const _dataSource = dataSource.map(({ ...rest }, i) => ({
        ...rest,
        id: `${i + 1}`
      }));

      this.setState({ dataSource: _dataSource });
    }
  };

  render() {
    const { dataSource, columns } = this.state;

    return (
      <Table
        className="DraggableTable"
        size="small"
        style={{ backgroundColor: "white", marginBottom: 15 }}
        dataSource={dataSource}
        columns={columns}
      />
    );
  }
}
