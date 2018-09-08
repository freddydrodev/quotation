import React, { Component } from "react";
import { Card, Button } from "antd";

export default class SectionCard extends Component {
  render() {
    const { extra, card, title, header, body } = style;
    const { sectionTitle } = this.props;

    return (
      <Card
        extra={<Button type="ghost" icon="eye" style={extra} />}
        style={card}
        bordered={false}
        title={<h4 style={title}>{sectionTitle}</h4>}
        headStyle={header}
        bodyStyle={body}
      >
        {this.props.children}
      </Card>
    );
  }
}

const style = {
  card: {
    textAlign: "left",
    borderRadius: 5,
    boxShadow: "0 5px 5px rgba(0,0,0,.05)",
    marginBottom: 15
  },
  header: {
    padding: "15px 15px 0 15px",
    border: 0
  },
  title: {
    marginBottom: 0,
    fontFamily: "Josefin Sans",
    fontWeight: 200,
    fontSize: 20,
    textAlign: "left",
    paddingBottom: 0
  },
  body: { padding: "0 15px 15px 15px" },
  extra: { fontSize: 20, paddingLeft: 20, paddingRight: 20 }
};
