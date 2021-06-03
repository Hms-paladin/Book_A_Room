import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./TotalBookroomTable.css";
import './TotalBookroomDashboard.css';
import crowngold from "../../Images/crown-golden.png";
import dateformat from "dateformat";
import Greenwalk from "../../Images/greenwalk.png";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import ProfileView from "./ProfileView";
import Axios from "axios";
import { Select,notification,Input } from "antd";
import pdf from '../../Images/pdf.svg'
import excel from '../../Images/excel.svg'
import print from '../../Images/print.svg'
import axios from "axios";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import jsPDF from 'jspdf';
import ReactSVG from "react-svg";
import 'jspdf-autotable';
import ReactExport from 'react-data-export';
import { MdFormatListBulleted } from "react-icons/md";
import PrintData from "./printdata";
import ReactToPrint from "react-to-print";
import {Spin} from 'antd';

const current_date = dateformat(new Date(), "dd mmm yyyy");

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class DashboardTable extends React.Component {
  state = {
    openview: false,
    viewdata:[],
    Search:null,
    wk_mh_yr_Data:[],
    loading:true,
    totalData:"",
    spinner: false,    
  };


  modelopen = (data,id) => {
    // alerTt(id)
    if (data === "view") {   
      this.setState({
         openview: true,
        viewdata:this.state.totalData[id]
         });   
    } 
    console.log(this.state.totalData[id],"qqqqq")
  };
  
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  componentDidMount(){
    this.GetApi()
   }
   
   GetApi=()=>{
    function formatTimeShow(h_24) {
      
      var h = Number(h_24.substring(0, 2)) % 12;
      if (h === 0) h = 12;
      return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }
    var self = this
    axios({
        method: 'POST',
        url: 'http://3.138.129.137:8158/api/v1/BookRoom/gettotalroomsbooked',
        data:{
          "brvendorId":"18",
          "fromDate":"2020-06-01",
          "toDate":"2020-09-25",
          "searchContent":"false",
          "name":"",
          "date":"",
          "limit":10,
          "pageno":1
        }
    }).then((response) => {
      console.log(response,"responsecheck")
      var  wk_mh_yr_Data=[]
        response.data.data[0].details.map((val,index) => {
          console.log(val,"val")
          wk_mh_yr_Data.push({customer:val.CustomerName,room_type:val.Roomtype,from_date:dateformat(val.br_from_date,"dd mmm yyyy"),
          to_date:dateformat(val.br_to_date,"dd mmm yyyy"),total_days:val.Noofdays,
          id:index})
        })
        self.setState({
          wk_mh_yr_Data,
          totalData:response.data.data[0].details,          
          loading:false
        })
        console.log(this.state.totalData,"total_data_check")
    }).catch((error) => {
        alert(JSON.stringify(error))
    })
  }

  dayReport=(data,firstOpen)=>{
    var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
    var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
    if(!firstOpen){
      this.setState({ spinner: true })
      }
    var self = this
    axios({
        method: 'POST',
        url: 'http://3.138.129.137:8158/api/v1/BookRoom/gettotalroomsbooked',
        data:{
          "brvendorId":"18",
          "fromDate":startdate,
          "toDate":enddate,
          "searchContent":"false",
          "name":"",
          "date":"",
          "limit":10,
          "pageno":1
        }
    }).then((response) => {
      var  wk_mh_yr_Data=[]
        response.data.data[0].details.map((val) => {
          console.log(val,"val")
          wk_mh_yr_Data.push({customer:val.CustomerName,room_type:val.Roomtype,from_date:dateformat(val.br_from_date,"dd mmm yyyy"),
          to_date:dateformat(val.br_to_date,"dd mmm yyyy"),total_days:val.Noofdays,id:val.CustomerId})
        })
        self.setState({
          wk_mh_yr_Data,
          totalData:response.data.data[0].details,          
          spinner: false 
         
        })
    }).catch((error) => {
        alert(JSON.stringify(error))
    })
  }

  // SEARCH FUNCTION 
  SearchData=(e)=>{
    this.setState({
      Search:e.target.value
    })
    this.setState({})
    console.log(this.state.Search,"ddd")
  }

  // pdf function
  generatepdf=()=>{
    if(this.state.wk_mh_yr_Data.length===0){
      notification.info({
        description:
          'No Data Found',
          placement:"topRight",
      });
    }
    else{
      const doc = new jsPDF("a3")
      var bodydata  = []
      this.state.wk_mh_yr_Data.map((data,index)=>{
        console.log(data,"dataaa")
        bodydata.push([index+1,data.customer,data.room_type,data.from_date,data.to_date,data.total_days])
      })
      doc.autoTable({
        beforePageContent: function(data) {
          doc.text("Uploaded Details", 15, 23); // 15,13 for css
          },
        margin: { top: 30 },
        showHead:"everyPage",
        theme:"grid",
        head: [['S.No', 'Customer', 'Room Type','From Date','To Date','Total Days']],
        body:bodydata,
      })
      doc.save('UploadDetails.pdf')
    }
  }

  Notification=()=>{
    notification.info({
      description:
        'N0 Data Found',
        placement:"topRight",
    });
  }

  formatTimeShow=(h_24)=> {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
  }

  render() {
    const { Option } = Select;
    const { Search } = Input;
    console.log(this.state.viewdata,"jjsjjs")

    // SEARCH DATA 
    const TotalBookSearch = this.state.wk_mh_yr_Data.filter((data)=>{
      console.log(data,"Search_data")
       if(this.state.Search=== null)
         return data

        else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.Search.toLowerCase())
        || (data.room_type != null && data.room_type.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.to_date != null && data.to_date.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.from_date != null && data.from_date.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.total_days != null && data.total_days.toString().includes(this.state.Search.toString()))
        ) {
          return data
      }   
    })
    
    var multiDataSetbody = []
    this.state.wk_mh_yr_Data.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.customer},
        {value:xldata.room_type},
        {value:xldata.from_date},
        {value:xldata.to_date},
        {value:xldata.total_days}])
      }
      else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.room_type,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.from_date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.to_date,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.total_days,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
       ])
      }
    })

    const multiDataSet = [
      {
          columns: [
              {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
              {title: "Room Type", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "From date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "To Date", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Total Days", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];

    return (
      <Spin className="spinner_align" spinning={this.state.loading}>
      <div>
         <div className="media_service_head">
            <div className="appointment_titleuser">TOTAL ROOMS BOOKED</div>
            <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
              <DateRangeSelect openDateRange={this.state.openDateRange} DateRange={()=>this.setState({openDateRange:!this.state.openDateRange})} dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
                  <Search
                    placeholder=" search "
                    onSearch={value => console.log(value)}
                    onChange ={(e)=>this.SearchData(e)}
                    style={{ width: 150 }}
                    className="search_box_container"
                    />
                    <div className="icon_head">
                      <ReactSVG
                        onClick={this.generatepdf}
                        src={pdf}
                        style={{ marginRight: "15px", marginLeft: "15px",cursor:"pointer" }}
                      />
                    {this.state.wk_mh_yr_Data.length === 0 ?
                    <ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />:
                      <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />}>
                        <ExcelSheet dataSet={multiDataSet} name="Appoinment Details" />
                      </ExcelFile>
                      }

                      {this.state.wk_mh_yr_Data.length === 0 ?
                      <ReactSVG  onClick={this.Notification} src={print} style={{ marginRight: "15px",cursor:"pointer" }} />:
                      <ReactToPrint
                        trigger={() => <ReactSVG src={print} style ={{cursor:"pointer"}} />}
                        content={() => this.componentRef}
                        
                      />
                    }
                      <div style={{ display: "none" }}><PrintData printTableData={this.state.wk_mh_yr_Data} ref={el => (this.componentRef = el)} /></div>
                    </div>
            </div>

          </div>
         
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            // { id: "type", label: "Type" },
            { id: "customer", label: "Customer Name" },
            { id: "room_type", label: "Room Type" },
            { id: "from_date", label: "From Date" },
            { id: "to_date", label: "To Date" },
            { id: "total_days", label: "Total Days" },

            { id: "", label: "Action" },
          ]}
          // rowdata={this.props.wk_mh_yr_Data && this.props.wk_mh_yr_Data}
          rowdata={TotalBookSearch.length ===  0 ? []:TotalBookSearch }
          tableicon_align={"cell_eye"}
          modelopen={(e,id )=> this.modelopen(e,id)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          props_loading={false}
        />
{/* 
        <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}  > */}
              <ProfileView open={this.state.openview} onClose={this.closemodal} viewdata={this.state.viewdata} />
        {/* </Modalcomp>
     */}

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>
      </div>
      </Spin>
    );
  }
}

export default DashboardTable;
