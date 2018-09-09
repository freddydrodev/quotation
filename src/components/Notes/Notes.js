import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";

export default class Notes extends Component {
  state = {
    dataSource: []
  };
  render() {
    const { dataSource } = this.state;

    return (
      <SectionCard title="Notes">
        <DynamicTable config={{}} dataSource={dataSource} />
      </SectionCard>
    );
  }
}
