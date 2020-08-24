import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./Revenuedetails.css";
import crowngold from "../../Images/crown-golden.png";
import dateFormat from "dateformat";
import Greenwalk from "../../Images/greenwalk.png";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class Revenuedetails extends React.Component {
  state = {
    openview: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "room_type", label: "Room Type" },
            { id: "quantity", label: "Quantity" },
            { id: "charge", label: "Charge" },
            { id: "cash", label: "Cash" },
            { id: "card", label: "Card" },
            { id: "insurance", label: "Insurance" },
            { id: "wallet", label: "Wallet" },
            { id: "total_charge", label: "Total Charge(KWD)" },
          ]}
          rowdata={[
            this.createData({
              customer: "test",
              room_type: "Single",
              quantity: "3",
              charge: "800",
              cash: "0",
              card: "1400",
              insurance: "0",
              wallet: "200",
              total_charge: "1800",
            }),
            this.createData({
              customer: "ashwin",
              room_type: "Single",
              quantity: "3",
              charge: "800",
              cash: "0",
              card: "1200",
              insurance: "0",
              wallet: "100",
              total_charge: "300",
            }),
            this.createData({
              customer: "syed",
              room_type: "Double",
              quantity: "3",
              charge: "500",
              cash: "0",
              card: "200",
              insurance: "0",
              wallet: "100",
              total_charge: "400",
            }),
            this.createData({
              customer: "edwin",
              room_type: "Triple",
              quantity: "3",
              charge: "800",
              cash: "0",
              card: "200",
              insurance: "0",
              wallet: "300",
              total_charge: "700",
            }),
            this.createData({
              customer: "arjun",
              room_type: "Single",
              quantity: "3",
              charge: "600",
              cash: "0",
              card: "1400",
              insurance: "0",
              wallet: "200",
              total_charge: "1200",
            }),
            this.createData({
              customer: "raja",
              room_type: "Quad",
              quantity: "3",
              charge: "300",
              cash: "0",
              card: "400",
              insurance: "0",
              wallet: "100",
              total_charge: "1800",
            }),
            this.createData({
              customer: "rani",
              room_type: "Single",
              quantity: "3",
              charge: "800",
              cash: "0",
              card: "800",
              insurance: "0",
              wallet: "200",
              total_charge: "300",
            }),
          ]}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          grandtotal="total"
          Workflow="close"
        />

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
    );
  }
}

export default Revenuedetails;
