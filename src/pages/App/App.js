import React, { Component } from "react";
import { Layout, Alert } from "antd";
import HeaderInformation from "../../components/HeaderInformation/HeaderInformation";
import InitialCost from "../../components/InitialCost/InitialCost";
import "./App.less";
import MonthlyCost from "../../components/MonthlyCost/MonthlyCost";

const { Content, Header } = Layout;
class App extends Component {
  state = {
    dataSources: {
      HeaderInformation: [],
      InitialCost: [],
      MonthlyCost: []
    }
  };

  getData = (section, data) => {
    if (this.state.dataSources[section]) {
      const dataSources = this.state.dataSources;
      dataSources[section] = data;

      this.setState({ dataSources }, () => {
        alert(JSON.stringify(this.state.dataSources[section]));
      });
    }
  };

  render() {
    return (
      <Layout>
        <Header
          style={{ backgroundColor: "#007FFF", color: "#FFF", fontSize: 16 }}
        >
          Any Header you like can replace this one...
        </Header>

        <Content style={{ padding: 15 }}>
          <Alert
            style={{ marginBottom: 15 }}
            type="info"
            message={
              <span>
                I have remove the 2 last section of each table from the result{" "}
                <i>
                  <b>Click on the eye button to see the results.</b>
                </i>
              </span>
            }
          />
          <HeaderInformation />
          <InitialCost getData={this.getData} />
          <MonthlyCost getData={this.getData} />
        </Content>
      </Layout>
    );
  }
}

export default App;
