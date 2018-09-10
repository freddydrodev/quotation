import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";
import Axios from "axios";
import { Skeleton } from "antd";

export default class Notes extends Component {
  state = {
    dataSource: [],
    columns: [
      { name: "Item", type: "text", notEditable: true, width: 80 },
      { name: "Note", type: "text" }
    ]
  };

  setData = dataSource => {
    this.setState({ dataSource });
  };

  async componentDidMount() {
    const dataSource = [];
    Axios.get("https://json.invite-comm.jp/api/json/notes")
      .then(({ data }) => {
        data.forEach(e => {
          const { text, item, record } = e;

          const el = {
            key: record,
            item,
            note: text
          };
          dataSource.push(el);
        });
      })
      .then(() => {
        this.setState({ dataSource, isReady: true }, () => {
          this.props.getData("Notes", this.state.dataSource, true);
        });
      });
  }

  render() {
    const { dataSource, columns, isReady } = this.state;
    return isReady ? (
      <SectionCard
        sectionTitle="Notes"
        getData={this.props.getData}
        data={dataSource}
        section="Notes"
      >
        <DynamicTable
          columns={columns}
          setData={this.setData}
          getCost={() => null}
          section="Notes"
          dataSource={dataSource}
          removeTax
        />
      </SectionCard>
    ) : (
      <SectionCard sectionTitle="Notes">
        <Skeleton active />
      </SectionCard>
    );
  }
}
