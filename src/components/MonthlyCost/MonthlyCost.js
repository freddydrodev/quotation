import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";
import Axios from "axios";
import { Skeleton } from "antd";

export default class MonthlyCost extends Component {
  state = {
    dataSource: [],
    columns: [
      { name: "Item", notEditable: true, width: 80 },
      { name: "Description", width: 250 },
      { name: "Quantity", type: "number", width: 100 },
      { name: "Unit", type: "select", width: 100 },
      { name: "Price", type: "number", width: 100 },
      {
        name: "Amount",
        notEditable: true,
        renderer: (amount, { price, quantity }, index) => (
          <i>{price * quantity || 0}</i>
        ),
        width: 150
      },
      { name: "Comment", width: 250 }
    ]
  };

  setData = dataSource => {
    this.setState({ dataSource });
  };
  async componentDidMount() {
    const dataSource = [];
    Axios.get("https://json.invite-comm.jp/api/json/install")
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
        this.setState({ dataSource, isReady: true }, () => {
          this.props.getData("MonthlyCost", this.state.dataSource, true);
        });
      });
  }

  render() {
    const { dataSource, columns, isReady } = this.state;
    return isReady ? (
      <SectionCard
        sectionTitle="Monthly Cost Details"
        getData={this.props.getData}
        data={dataSource}
        section="MonthlyCost"
      >
        <DynamicTable
          dataSource={dataSource}
          setData={this.setData}
          getCost={this.props.getCost}
          section="MonthlyCost"
          columns={columns}
        />
      </SectionCard>
    ) : (
      <SectionCard sectionTitle="Monthly Cost Details">
        <Skeleton active />
      </SectionCard>
    );
  }
}
