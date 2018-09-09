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
        <Header
          style={{ backgroundColor: "#007FFF", color: "#FFF", fontSize: 16 }}
        >
          Any Header you like can replace this one...
        </Header>
        <Content style={{ padding: 15 }}>
          <HeaderInformation />
          <InitialCost />
        </Content>
      </Layout>
    );
  }
}

export default App;
