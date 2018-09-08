import React, { Component } from "react";
import { Input, DatePicker, Row, Col } from "antd";
import SectionCard from "../Common/SectionCard/SectionCard.js";

export default class HeaderInformation extends Component {
  state = {
    fields: [
      {
        label: "Company Name",
        content: <Input placeholder="Name of the company" />
      },
      {
        label: "Type",
        content: <Input placeholder="Contract Type" />
      },
      {
        label: "Delivery Date",
        content: <DatePicker style={{ width: "100%" }} />
      },
      {
        label: "Terms",
        content: <Input placeholder="Terms of the contract" />
      }
    ]
  };
  render() {
    const { labelStyle, summary, para } = style;
    return (
      <SectionCard sectionTitle="Header Information">
        <Row gutter={15} type="flex" style={{ marginBottom: 15 }}>
          {this.state.fields.map(({ label, content }, i) => (
            <Col span={12} key={i}>
              <strong style={labelStyle}>{label}</strong>
              {content}
            </Col>
          ))}
        </Row>
        <div style={summary}>
          <p style={para}>
            <strong>Expiration Date:</strong> 2018-10-06
          </p>
          <p style={para}>
            <strong>Initial Cost:</strong> 209844
          </p>
          <p style={para}>
            <strong>Monthly Cost:</strong> 297972
          </p>
        </div>
      </SectionCard>
    );
  }
}
const style = {
  labelStyle: { padding: "15px 0 5px 0", display: "block" },
  summary: {
    padding: "10px 15px",
    backgroundColor: "#F5F5F5",
    color: "#585B60",
    fontSize: 13,
    borderRadius: 5
  },
  para: { marginBottom: 5, color: "#585B60" }
};
