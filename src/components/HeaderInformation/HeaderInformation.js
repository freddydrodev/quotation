import React, { Component } from "react";
import { Input, DatePicker, Row, Col, Form } from "antd";
import SectionCard from "../Common/SectionCard/SectionCard.js";

const FormItem = Form.Item;

class HeaderFormComponent extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark>
        <Row gutter={15} type="flex">
          <Col span={12}>
            <FormItem label={<strong>Company Name</strong>}>
              {getFieldDecorator("companyName", {
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Contract Name" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={<strong>Contract Type</strong>}>
              {getFieldDecorator("contractType", {
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Contract Type" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={<strong>Delivery Date</strong>}>
              {getFieldDecorator("contractType", {
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(<DatePicker style={{ width: "100%" }} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={<strong>Terms Of The Contract</strong>}>
              {getFieldDecorator("contractType", {
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Terms of the contract" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const HeaderForm = Form.create()(HeaderFormComponent);

export default class HeaderInformation extends Component {
  state = {};
  render() {
    const { summary, para } = style;
    const { initialCost, monthlyCost } = this.props;
    return (
      <SectionCard sectionTitle="Header Information">
        <HeaderForm />
        <div style={summary}>
          <p style={para}>
            <strong>Expiration Date:</strong> 2018-10-06
          </p>
          <p style={para}>
            <strong>Initial Cost:</strong> {initialCost}
          </p>
          <p style={para}>
            <strong>Monthly Cost:</strong> {monthlyCost}
          </p>
        </div>
      </SectionCard>
    );
  }
}
const style = {
  summary: {
    padding: "10px 15px",
    backgroundColor: "#F5F5F5",
    color: "#585B60",
    fontSize: 13,
    borderRadius: 5
  },
  para: { marginBottom: 5, color: "#585B60" }
};
