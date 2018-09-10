import React, { Component } from "react";
import { Layout, Alert, Button } from "antd";
import _ from "lodash";
import HeaderInformation from "../../components/HeaderInformation/HeaderInformation";
import InitialCost from "../../components/InitialCost/InitialCost";
import MonthlyCost from "../../components/MonthlyCost/MonthlyCost";
import Notes from "../../components/Notes/Notes";
import "./App.less";

const { Content, Header } = Layout;
class App extends Component {
  state = {
    cost: {
      InitialCost: 0,
      MonthlyCost: 0
    },
    dataSources: {
      HeaderInformation: {},
      InitialCost: [],
      MonthlyCost: [],
      Notes: []
    }
  };

  getData = (section, data, preventAlert) => {
    if (this.state.dataSources[section]) {
      const dataSources = this.state.dataSources;
      dataSources[section] = data;

      this.setState({ dataSources }, () => {
        if (!preventAlert) {
          alert(JSON.stringify(this.state.dataSources[section]));
        }
      });
    }
  };

  getCost = (section, data) => {
    if (typeof this.state.cost[section] === "number") {
      const cost = this.state.cost;

      cost[section] = _.sum([...data].map(e => e.amount));

      this.setState({ cost });
    }
  };

  render() {
    const { cost } = this.state;
    return (
      <Layout>
        <Header
          style={{ backgroundColor: "#007FFF", color: "#FFF", fontSize: 16 }}
        >
          Any Header you like can replace this one...
          <Button
            style={{ float: "right", margin: "15px 0" }}
            icon="eye"
            onClick={() => alert(JSON.stringify(this.state.dataSources))}
          >
            Main data preview
          </Button>
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
          <HeaderInformation
            initialCost={cost.InitialCost}
            monthlyCost={cost.MonthlyCost}
            getData={this.getData}
          />
          <InitialCost getData={this.getData} getCost={this.getCost} />
          <MonthlyCost getData={this.getData} getCost={this.getCost} />
          <Notes getData={this.getData} />
        </Content>
      </Layout>
    );
  }
}

export default App;
