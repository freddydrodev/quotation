import React, { Component } from "react";
import { Layout } from "antd";
import HeaderInformation from "../../components/HeaderInformation/HeaderInformation";
import InitialCost from "../../components/InitialCost/InitialCost";
import "./App.less";

const { Content, Header } = Layout;
class App extends Component {
  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: "#007FFF" }}>okok</Header>
        <Content style={{ padding: 15 }}>
          <HeaderInformation />
          <InitialCost />
        </Content>
      </Layout>
    );
  }
}

export default App;
