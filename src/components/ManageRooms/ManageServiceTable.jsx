



import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./ManageServiceTable.css";
import dateFormat from "dateformat";
import { Input, Select, Icon } from 'antd';
import ManageServiceModal from "./ManageServiceModal";
import Axios from "axios";
// import IconsModal from '../ManageService/IconsModal'
import{apiurl} from "../../App";
const current_date = dateFormat(new Date(), "dd mmm yyyy");

class DashboardTable extends React.Component {
  state = {
    openview: false,
    editopen:false,
    getTableData:[],
    tabledata:[]
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ editopen: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ editopen: false, editopen: false });
  };
  componentDidMount(){
    this.getTableData();
  }

  getTableData =()=>{
    Axios({
      method:"post",
      url:apiurl+'getRoomDetails',
      data:{
        "roomVendorId":"18",
        "limit":1000,
        "pageno":1
      }
    })
    .then((response)=>{
      var tabledata =[]
      response.data.data[0].details.map((val,index)=>{
        tabledata.push({roomtype:val.br_room_type,roomname:val.br_room_name,quantity:val.br_quanity,
          change_per_day:val.br_charge_per_day,id:index})
       this.setState({
        tabledata:tabledata
       })          
      })
    })
    .catch((err)=>{
    })
  }

  render() {
    const { Search } = Input;
    return (
      <div>
  
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "roomtype", label: "Room Type" },
            { id: "roomname", label: "Room Name" },
            { id: "quantity", label: "Quantity" },
            { id: "change_per_day", label: "Charge Per Day" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tabledata && this.state.tabledata}
          modelopen={(e) => this.modelopen(e)}
          VisibilityIcon={"close"}
          props_loading={false}
        />

        <Modalcomp
          visible={this.state.editopen}
          xswidth={"lg"}
          clrchange="text_clr_change"
          title={"ADD EDIT/ROOMS"}
          editData={this.state.editopen}
          editopenModal ={this.state.editopen && true}
          closemodal={(e) => this.closemodal(e)} 
        >
          {/* <IconsModal/> */}
          {/* <ManageServiceModal/> */}
          <ManageServiceModal
            editData={this.state.editopen}
            editopenModal ={this.state.editopen && true}
            closemodal={this.closemodal}
          />
        </Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;






























// import React from "react";
// import Tablecomponent from "../../helpers/TableComponent/TableComp";
// import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import Card from "@material-ui/core/Card";
// import Button from "@material-ui/core/Button";
// import { NavLink } from "react-router-dom";
// import "./ManageServiceTable.css";
// import crowngold from "../../Images/crown-golden.png";
// import dateFormat from "dateformat";

// import { Input, Select, Icon } from 'antd';
// import ManageServiceModal from "./ManageServiceModal";
// // import IconsModal from '../ManageService/IconsModal'
// const current_date = dateFormat(new Date(), "dd mmm yyyy");

// class DashboardTable extends React.Component {
//   state = {
//     openview: false,
//   };

//   createData = (parameter) => {
//     var keys = Object.keys(parameter);
//     var values = Object.values(parameter);

//     var returnobj = {};

//     for (var i = 0; i < keys.length; i++) {
//       returnobj[keys[i]] = values[i];
//     }
//     return returnobj;
//   };

//   modelopen = (data) => {
//     if (data === "view") {
//       this.setState({ openview: true });
//     } else if (data === "edit") {
//       this.setState({ editopen: true });
//     }
//   };

//   closemodal = () => {
//     this.setState({ openview: false, editopen: false });
//   };

//   render() {
//     const { Search } = Input;
//     return (
//       <div>
  
//         <Tablecomponent
//           heading={[
//             { id: "", label: "S.No" },
//             { id: "roomtype", label: "Room Type" },
//             { id: "roomname", label: "Room Name" },
//             { id: "quantity", label: "Quantity" },
//             { id: "change_per_day", label: "Change Per Day" },
//             { id: "", label: "Action" },
//           ]}
//           rowdata={[
//             this.createData({
//               roomtype: "Single",
//               roomname: "Executive Room",
//               quantity: "5",
//               change_per_day: "100",
//             }),
//             this.createData({
//               roomtype: "Double",
//               roomname: "Deluxe Room",
//               quantity: "5",
//               change_per_day: "120",
//             }),
//             this.createData({
//               roomtype: "Single",
//               roomname: "Super Deluxe Room",
//               quantity: "5",
//               change_per_day: "140",
//             }),
//             this.createData({
//               roomtype: "Double",
//               roomname: "Suite Room",
//               quantity: "5",
//               change_per_day: "160",
//             }),
//             this.createData({
//               roomtype: "Quad",
//               roomname: "Deluxe Room",
//               quantity: "5",
//               change_per_day: "180",
//             }),
//             this.createData({
//               roomtype: "Double",
//               roomname: "Suite Room",
//               quantity: "5",
//               change_per_day: "80",
//             }),
//             this.createData({
//               roomtype: "Single",
//               roomname: "Executive Room",
//               quantity: "5",
//               change_per_day: "100",
//             }),
//           ]}
//           tableicon_align={""}
//           modelopen={(e) => this.modelopen(e)}
//           VisibilityIcon={"close"}
//           Workflow="close"
//         />

//         <Modalcomp
//           visible={this.state.editopen}
//           xswidth={"lg"}
//           clrchange="text_clr_change"
//           title={"ADD EDIT/ROOMS"}
//           closemodal={(e) => this.closemodal(e)}
//         >
//           {/* <IconsModal/> */}
//           {/* <ManageServiceModal/> */}
//           <ManageServiceModal
//             open={this.state.editopen}
//             onClose={this.closemodal}
//           />
//         </Modalcomp>
//       </div>
//     );
//   }
// }

// export default DashboardTable;
