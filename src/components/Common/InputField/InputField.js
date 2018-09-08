import React, { Component } from "react";
import { Col } from "antd";

export default class InputField extends Component {
  render() {
    const { labelStyle } = style;
    const { content, label } = this.props;

    return (
      <Col span={12}>
        <strong style={labelStyle}>{label}</strong>
        {content}
      </Col>
    );
  }
}

const style = {
  labelStyle: { padding: "15px 0 5px 0", display: "block" }
};
