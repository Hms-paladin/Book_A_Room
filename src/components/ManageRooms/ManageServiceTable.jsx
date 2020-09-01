



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
    tabledata:[],
    props_loading:false,
    editdetails:[],
    // editoneTimeOpen:false,
  };

  modelopen = (data,id) => {
    if (data === "view") {
      this.setState({ editopen: true });
    } else if (data === "edit") {
     var editdetails = this.state.fulltabledata.filter((data)=>{
       return data.roomId === id
      })
      this.setState({ editdetails:editdetails[0],editopen: true,
        // editoneTimeOpen:true
       });
    }
  };

  closemodal = () => {
    this.setState({ editopen: false, editopen: false });
  };
  componentDidMount(){
    this.getTableData();
  }

  UNSAFE_componentWillReceiveProps(newprops){
    if(newprops.getTableData){
      this.getTableData("notifymsg")
      this.props.getTableDatafalse()
    }
  }

  getTableData =(notifymsg)=>{
    if(notifymsg){
      this.setState({
        props_loading:true
       })       
    }

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
      var fulltabledata =[]

      response.data.data[0].details.map((val,index)=>{
        tabledata.push({roomtype:val.br_room_type,roomname:val.br_room_name,quantity:val.br_quanity,
          change_per_day:val.br_charge_per_day,id:val.roomId}) 
        fulltabledata.push(val)     
      })
      this.setState({
        tabledata:tabledata,
        fulltabledata:fulltabledata,
        props_loading:false,
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
          modelopen={(e,id) => this.modelopen(e,id)}
          VisibilityIcon={"close"}
          props_loading={this.state.props_loading}
        />

        <Modalcomp
          visible={this.state.editdetails && this.state.editopen}
          xswidth={null}
          clrchange="text_clr_change"
          title={"ADD EDIT/ROOMS"}
          // editData={this.state.editopen}
          // editopenModal ={this.state.editopen && true}
          closemodal={(e) => this.closemodal(e)} 
        >
          <ManageServiceModal
            closemodal={this.closemodal}
            editdetails={this.state.editdetails}
            // editoneTimeclose={()=>this.setState({editoneTimeOpen:false})}
            // editoneTimeOpen={this.state.editoneTimeOpen}
          />
        </Modalcomp>
      </div>
    );
  }
}

export default DashboardTable;
