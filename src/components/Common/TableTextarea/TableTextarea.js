import React, { Component } from "react";
import { Input, Form } from "antd";

class TableTextarea extends Component {
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

    // <i>textarea {desc}</i>
    return this.state.editing ? (
      <Form>
        <Form.Item style={{ marginBottom: 0, padding: 0 }}>
          {getFieldDecorator(this.index, {
            initialValue: ph,
            rules: [{ required: true, message: "Please insert a description!" }]
          })(
            <Input
              onKeyUp={this.changeHandler}
              placeholder={ph}
              autoFocus={this.state.editing}
              onBlur={() => this.setState({ editing: false })}
              size="small"
            />
          )}
        </Form.Item>
      </Form>
    ) : (
      <i
        onClick={() => this.setState({ editing: true })}
        style={{ display: "block", maxWidth: 200 }}
      >
        {ph}
      </i>
    );
  }
}

export default Form.create()(TableTextarea);
