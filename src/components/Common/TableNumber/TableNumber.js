import React, { Component } from "react";
import { InputNumber, Form } from "antd";

class TableNumber extends Component {
  state = {
    editing: false
  };

  changeHandler = () => {
    const { form, change, idx, type } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        change(values[this.index], idx, type);
      }
    });
  };

  render() {
    const { ph, form, type, idx } = this.props;
    const { getFieldDecorator } = form;
    this.index = `${type}-${idx}`;

    return this.state.editing ? (
      <Form>
        <Form.Item style={{ marginBottom: 0, padding: 0 }}>
          {getFieldDecorator(this.index, {
            initialValue: ph,
            rules: [
              { required: true, message: "Please insert a description!" },
              { type: "number", message: "Must be numbers" }
            ]
          })(
            <InputNumber
              min={1}
              onKeyUp={this.changeHandler}
              placeholder={ph}
              onInput={() => console.log("object")}
              autoFocus={this.state.editing}
              onBlur={() => this.setState({ editing: false })}
              size="small"
            />
          )}
        </Form.Item>
      </Form>
    ) : (
      <i onClick={() => this.setState({ editing: true })}>{ph}</i>
    );
  }
}

export default Form.create()(TableNumber);
