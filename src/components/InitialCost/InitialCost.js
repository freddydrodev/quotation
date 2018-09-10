import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";
import Axios from "axios";
import { Skeleton } from "antd";

export default class InitialCost extends Component {
  state = {
    isReady: false,
    dataSource: [],
    columns: [
      { name: "Item", notEditable: true, width: 80 },
      { name: "Description", width: 250 },
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
      { name: "Comment", width: 250 }
    ]
  };

  setData = dataSource => {
    this.setState({ dataSource });
  };

  async componentDidMount() {
    const dataSource = [];
    Axios.get("http://json.invite-comm.jp/api/json/install")
      .then(({ data }) => {
        data.forEach(e => {
          const { amount, comment, desc, item, price, qty, record, unit } = e;

          const el = {
            key: record,
            item,
            amount,
            price,
            comment,
            unit,
            description: desc,
            quantity: qty
          };
          dataSource.push(el);
        });
      })
      .then(() => {
        this.setState({ dataSource, isReady: true });
      });
  }

  render() {
    const { dataSource, columns, isReady } = this.state;
    return isReady ? (
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
    ) : (
      <SectionCard sectionTitle="Initial Cost Details">
        <Skeleton active />
      </SectionCard>
    );
  }
}
