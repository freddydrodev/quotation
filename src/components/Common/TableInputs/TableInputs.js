import React, { Component } from "react";
import { Input, InputNumber, Select, Form } from "antd";

const FormItem = Form.Item;
const OPTIONS = [
  { content: "GK" },
  { content: "OA" },
  { content: "RN" },
  { content: "NY" },
  { content: "LZ" },
  { content: "TK" }
];
const { Option } = Select;

//create input text
class TableInputText extends Component {
  render() {
    const { prevValue, form, fieldIndex, analizer } = this.props;
    const { getFieldDecorator } = form;

    return (
      <FormItem style={style.formItem}>
        {getFieldDecorator(fieldIndex, {
          initialValue: prevValue,
          rules: [
            { required: true, message: "Cannot stay empty", whitespace: true }
          ]
        })(
          <Input
            placeholder={prevValue}
            onBlur={analizer}
            size="small"
            autoFocus
          />
        )}
      </FormItem>
    );
  }
}

//create input number
class TableInputNumber extends Component {
  render() {
    const { prevValue, form, fieldIndex, analizer } = this.props;
    const { getFieldDecorator } = form;

    return (
      <FormItem style={style.formItem}>
        {getFieldDecorator(fieldIndex, {
          initialValue: prevValue,
          rules: [
            { required: true, message: "Cannot stay empty" },
            { type: "number", message: "Must be numbers" }
          ]
        })(
          <InputNumber
            min={1}
            placeholder={prevValue}
            onBlur={analizer}
            size="small"
            autoFocus
          />
        )}
      </FormItem>
    );
  }
}

//create select option
class TableSelectOption extends Component {
  render() {
    const { prevValue, form, fieldIndex, analizer } = this.props;
    const { getFieldDecorator } = form;

    return (
      <FormItem style={style.formItem}>
        {getFieldDecorator(fieldIndex, {
          initialValue: prevValue,
          rules: [{ required: true, message: "Cannot stay empty" }]
        })(
          <Select
            placeholder={prevValue}
            onChange={value => analizer(value)}
            onBlur={analizer}
            autoFocus
            size="small"
          >
            {OPTIONS.map(({ content }) => (
              <Option key={content} value={content}>
                {content}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
    );
  }
}

class TableInputs extends Component {
  state = {
    editing: false
  };

  generateInput = () => {
    const { type, data, form } = this.props;
    const props = {
      prevValue: data.prevValue,
      analizer: this.analizer,
      form,
      fieldIndex: `${data.fieldType}-${data.fieldPos}`
    };

    this.index = props.fieldIndex;

    switch (type) {
      case "text":
        return <TableInputText {...props} />;
      case "number":
        return <TableInputNumber {...props} />;
      case "select":
        return <TableSelectOption {...props} />;
      default:
        return null;
    }
  };

  //selectedValue is only used in case of select option
  analizer = selectedValue => {
    const { fieldType, fieldPos } = this.props.data;

    this.props.form.validateFields((err, values) => {
      if (typeof selectedValue === "string") {
        this.props.change(selectedValue, fieldPos, fieldType);
      } else {
        if (!err) {
          this.props.change(values[this.index], fieldPos, fieldType);
        }
      }
      this.setState({ editing: false });
    });
  };

  render() {
    return this.state.editing ? (
      <Form>{this.generateInput()}</Form>
    ) : (
      <i onDoubleClick={() => this.setState({ editing: true })}>
        {this.props.data.prevValue}
      </i>
    );
  }
}

export default Form.create()(TableInputs);

const style = { formItem: { marginBottom: 0, padding: 0 } };
