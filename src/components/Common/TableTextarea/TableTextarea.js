import React, { Component } from "react";
import { Input } from "antd";

const { TextArea } = Input;
export default class TableTextarea extends Component {
  render() {
    const { value, change, ph } = this.props;
    return <TextArea value={value} onChange={change} placeholder={ph} />;
  }
}
