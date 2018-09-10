import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";

export default class InitialCost extends Component {
  state = {
    dataSource: [],
    columns: [
      { name: "Item", notEditable: true, width: 80 },
      { name: "Description" },
      { name: "Quantity", type: "number" },
      { name: "Unit", type: "select" },
      { name: "Price", type: "number" },
      {
        name: "Amount",
        notEditable: true,
        renderer: (amount, { price, quantity }, index) => (
          <i>{price * quantity || 0}</i>
        )
      },
      { name: "Comment" }
    ]
  };

  setData = dataSource => {
    this.setState({ dataSource });
  };

  render() {
    const { dataSource, columns } = this.state;
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
          columns={columns}
        />
      </SectionCard>
    );
  }
}
