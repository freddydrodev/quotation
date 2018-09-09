import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";

export default class InitialCost extends Component {
  state = {
    dataSource: []
  };

  setData = dataSource => {
    this.setState({ dataSource });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <SectionCard
        sectionTitle="Initial Cost Details"
        getData={this.props.getData}
        data={dataSource}
        section="InitialCost"
      >
        <DynamicTable
          dataSource={dataSource}
          setData={this.setData}
          getCost={this.props.getCost}
          section="InitialCost"
        />
      </SectionCard>
    );
  }
}
