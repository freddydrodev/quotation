import React, { Component } from "react";
import SectionCard from "../Common/SectionCard/SectionCard";
import DynamicTable from "../Common/DynamicTable/DynamicTable";

export default class Notes extends Component {
  state = {
    dataSource: [],
    columns: [
      { name: "ID", type: "text", notEditable: true, width: 80 },
      { name: "Notes", type: "text" }
    ]
  };

  setData = dataSource => {
    this.setState({ dataSource });
  };

  render() {
    const { dataSource, columns } = this.state;

    return (
      <SectionCard
        sectionTitle="Notes"
        getData={this.props.getData}
        data={dataSource}
        section="Notes"
      >
        <DynamicTable
          columns={columns}
          setData={this.setData}
          getCost={() => null}
          section="Notes"
          dataSource={dataSource}
          removeTax
        />
      </SectionCard>
    );
  }
}

// columns: [
//   {
//     title: "Item",
//     dataIndex: "item",
//     key: "item",
//     width: 100,
//     render: (value, rec, index) => {
//       if (index === this.state.limit) {
//         return {
//           children: (
//             <Button type="dashed" block onClick={this.addRowHandler}>
//               Add a new row
//             </Button>
//           ),
//           props: {
//             colSpan: 8
//           }
//         };
//       } else {
//         return <b>{value}</b>;
//       }
//     }
//   },
//   {
//     title: "Description",
//     dataIndex: "description",
//     key: "description",
//     render: (prevValue, rec, index) =>
//       this.conditionalRenderer(prevValue, index, "description", "text"),
//     width: 200
//   },
//   {
//     title: "Quantity",
//     dataIndex: "quantity",
//     key: "quantity",
//     render: (prevValue, rec, index) =>
//       this.conditionalRenderer(prevValue, index, "quantity", "number"),
//     width: 100
//   },
//   {
//     title: "Unit",
//     dataIndex: "unit",
//     key: "unit",
//     render: (prevValue, rec, index) =>
//       this.conditionalRenderer(prevValue, index, "unit", "select"),
//     width: 100
//   },
//   {
//     title: "Price",
//     dataIndex: "price",
//     key: "price",
//     render: (prevValue, rec, index) =>
//       this.conditionalRenderer(prevValue, index, "price", "number"),
//     width: 100
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//     key: "amount",
//     render: (amount, { price, quantity }, index) => {
//       if (index === this.state.limit) {
//         return {
//           props: {
//             colSpan: 0
//           }
//         };
//       }
//       return <i>{price * quantity || 0}</i>;
//     },
//     width: 100
//   },
//   {
//     title: "Comment",
//     dataIndex: "comment",
//     key: "comment",
//     render: (prevValue, rec, index) =>
//       this.conditionalRenderer(prevValue, index, "comment", "text"),
//     width: 200
//   },
//   {
//     title: "Option",
//     dataIndex: "option",
//     key: "option",
//     width: 80,
//     render: (a, b, index) => {
//       if (index === this.state.limit) {
//         return {
//           props: {
//             colSpan: 0
//           }
//         };
//       }
//       return (
//         <Button
//           size="small"
//           type="danger"
//           icon="delete"
//           block
//           onClick={() => this.removeRowHandler(index)}
//         />
//       );
//     }
//   }
// ]
