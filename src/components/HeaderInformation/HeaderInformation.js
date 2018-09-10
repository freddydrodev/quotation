import React, { Component } from "react";
import { Input, DatePicker, Row, Col, Form, Skeleton } from "antd";
import Axios from "axios";
import moment from "moment";
import SectionCard from "../Common/SectionCard/SectionCard.js";

const FormItem = Form.Item;

class HeaderFormComponent extends Component {
  updateData = () => {
    this.props.form.validateFields(
      (err, { company, terms, delivery, type }) => {
        if (!err) {
          this.props.setData({
            company,
            terms,
            delivery: delivery.format("YYYY/MM/DD"),
            type
          });
        }
      }
    );
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { company, terms, delivery, type } = this.props;
    return (
      <Form hideRequiredMark onSubmit={() => console.log("object")}>
        <Row gutter={15} type="flex">
          <Col span={12}>
            <FormItem label={<strong>Company Name</strong>}>
              {getFieldDecorator("company", {
                initialValue: company,
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(
                <Input placeholder="Contract Name" onBlur={this.updateData} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={<strong>Contract Type</strong>}>
              {getFieldDecorator("type", {
                initialValue: type,
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(
                <Input placeholder="Contract Type" onBlur={this.updateData} />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={<strong>Delivery Date</strong>}>
              {getFieldDecorator("delivery", {
                initialValue: moment(delivery || new Date()),
                rules: [
                  {
                    type: "object",
                    required: true,
                    message: "Please select a date!"
                  }
                ]
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={this.updateData}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label={<strong>Terms Of The Contract</strong>}>
              {getFieldDecorator("terms", {
                initialValue: terms,
                rules: [
                  {
                    required: true,
                    message: "This Field is required",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  placeholder="Terms of the contract"
                  onBlur={this.updateData}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const HeaderForm = Form.create()(HeaderFormComponent);

export default class HeaderInformation extends Component {
  state = {
    isReady: false,
    dataSource: {}
  };

  setData = data => {
    const _dataSource = this.state.dataSource;
    const dataSource = { ..._dataSource, ...data };
    this.setState({ dataSource }, () => {
      this.props.getData(this.state.dataSource);
    });
  };

  async componentDidMount() {
    Axios.get("https://json.invite-comm.jp/api/json/company").then(
      ({ data }) => {
        const { company, type, delivery, terms, record } = data;
        const dataSource = {
          key: record,
          company,
          type,
          delivery,
          terms
        };
        this.setState({ dataSource, isReady: true }, () => {
          this.props.getData("HeaderInformation", this.state.dataSource, true);
        });
      }
    );
  }

  render() {
    const { summary, para } = style;
    const { dataSource, isReady } = this.state;
    const { initialCost, monthlyCost, getData } = this.props;
    return (
      <SectionCard
        sectionTitle="Header Information"
        getData={getData}
        data={dataSource}
        section="HeaderInformation"
      >
        {isReady ? (
          <React.Fragment>
            <HeaderForm {...dataSource} setData={this.setData} />
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
          </React.Fragment>
        ) : (
          <Skeleton active />
        )}
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
