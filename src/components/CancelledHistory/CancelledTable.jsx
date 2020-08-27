import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import "./CancelledTable.css";
import dateformat from "dateformat";
import { Input, Select, Icon,notification ,Spin} from 'antd';
import pdf from '../../Images/pdf.svg'
import excel from '../../Images/excel.svg'
import print from '../../Images/print.svg';
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactSVG from "react-svg";
import ReactExport from 'react-data-export';
import { MdFormatListBulleted } from "react-icons/md";
import PrintData from "./printdata";
import ReactToPrint from "react-to-print";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import { apiurl } from "../../App";
const current_date = dateformat(new Date(), "dd mmm yyyy");
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class DashboardTable extends React.Component {
  state = {
    openview: false,
    wk_mh_yr_Data:[],
    Search:null,
    spinner:false,
    dateRangeOpen:false,
    openDateRange:false,
    // props_loading:true
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false,editopen: false });
  };

  dayReport=(data,firstOpen)=>{
   
    function formatTimeShow(h_24) {
      
      var h = Number(h_24.substring(0, 2)) % 12;
      if (h === 0) h = 12;
      return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
    }
     
      var startdate = dateformat(data[0].startDate, "yyyy-mm-dd")
      var enddate = dateformat(data[0].endDate, "yyyy-mm-dd")
      if(!firstOpen){
        this.setState({ spinner: true })
        }
      var self = this
    axios({
        method: 'POST',
        url: apiurl + "BookRoom/getroomcancelledlist",
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
      console.log(response,"canceldata")
        response.data.data[0].details.map((val) => {
          console.log(val,"val")
          wk_mh_yr_Data.push({customer:val.CustomerName,room_type:val.Roomtype,cancel:dateformat(val.CancelDate,"dd mmm yyyy"),
          time:formatTimeShow(val.CancelTime),id:val.CustomerId})
        })
        self.setState({
          wk_mh_yr_Data,
          props_loading: false,
          spinner:false
         
        })
    }).catch((error) => {
        // alert(JSON.stringify(error))
    })
  }

  Getapi=()=>{
    function formatTimeShow(h_24) {
      
      var h = Number(h_24.substring(0, 2)) % 12;
      if (h === 0) h = 12;
      return (h < 10 ? '0' : '') + h + ':'+h_24.substring(3, 5) + (Number(h_24.substring(0, 2)) < 12 ? ' AM' : ' PM');
    }
      this.setState({
        props_loading:true,
      })
    var self = this
    axios({
        method: 'POST',
        url: apiurl + "BookRoom/getroomcancelledlist",
        data:{
          "brvendorId":"18",
          "fromDate":dateformat(new Date(), "yyyy-mm-dd"),
          "toDate":dateformat(new Date(), "yyyy-mm-dd"),
          "searchContent":"false",
          "name":"",
          "date":"",
          "limit":10,
          "pageno":1
        }
    }).then((response) => {
      var  wk_mh_yr_Data=[]
      console.log(response,"canceldata")
        response.data.data[0].details.map((val) => {
          console.log(val,"val")
          wk_mh_yr_Data.push({customer:val.CustomerName,room_type:val.Roomtype,cancel:dateformat(val.CancelDate,"dd mmm yyyy"),
          time:formatTimeShow(val.CancelTime),id:val.CustomerId})
        })
        self.setState({
          wk_mh_yr_Data,
          props_loading:false,
         
        })
    }).catch((error) => {
    })
  }

  componentDidMount(){
    this.Getapi()
   }

   SearchData=(e)=>{
    this.setState({
      Search:e.target.value
    })
    this.setState({})
    console.log(this.state.Search,"ddd")
  }
//  PDF function
  
  generatepdf=()=>{
    if(this.state.wk_mh_yr_Data.length === 0){
      // alert("empty")
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
        bodydata.push([index+1,data.customer,data.room_type,data.cancel,data.time])
      })
      doc.autoTable({
        beforePageContent: function(data) {
          doc.text("Uploaded Details", 15, 23); // 15,13 for css
          },
        margin: { top: 30 },
        showHead:"everyPage",
        theme:"grid",
        head: [['S.No', 'Customer', 'Room Type','Cancelled Date','Time']],
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

  render() {
    const { Search } = Input;
    const CancelsearchData = this.state.wk_mh_yr_Data.filter((data)=>{
      console.log(data,"Search_data")
      if(this.state.Search=== null)
         return data

        else if (data.customer !== null && data.customer.toLowerCase().includes(this.state.Search.toLowerCase())
        || (data.room_type != null && data.room_type.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.cancel != null && data.cancel.toLowerCase().includes(this.state.Search.toLowerCase()))
        || (data.time != null && data.time.toLowerCase().includes(this.state.Search.toLowerCase()))
        ) {
          return data
      }   
    }
    )

// excel function
    var multiDataSetbody = []
    this.state.wk_mh_yr_Data.map((xldata,index)=>{
      if(index%2!==0){
        multiDataSetbody.push([{value:index+1,style:{alignment:{horizontal:"center"}}},
        {value:xldata.customer},
        {value:xldata.room_type},
        {value:xldata.cancel},
        {value:xldata.time},
       ])
      }
      else{
      multiDataSetbody.push([
        {value:index+1,style: {alignment:{horizontal:"center"},fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.customer,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.room_type,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.cancel,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
        {value:xldata.time,style: {fill: {patternType: "solid", fgColor: {rgb: "e2e0e0"}}}},
       ])
      }
    })

    const multiDataSet = [
      {
          columns: [
              {title: "S.No", width: {wpx: 35},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Customer", width: {wch: 20},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}}, 
              {title: "Room Type", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Cancelled Date",width:{wpx: 100},style:{fill:{patternType: "solid", fgColor: {rgb: "86b149"}}}},
              {title: "Time", width: {wpx: 90},style: {fill: {patternType: "solid", fgColor: {rgb: "86b149"}}}},
          ],
          data: multiDataSetbody      
      }
  ];


    return (
      <Spin className="spinner_align" spinning={this.state.spinner}>
      <div>
        <div className="uploadsmasterheader">
          <div className="titleuser">CANCELLED BOOKINGS</div>
            <div className="doctorplus-container">
              <div className="cancel_group_buttons_div">  
                <DateRangeSelect dynalign={"dynalign"} rangeDate={(item)=>this.dayReport(item)} />
                  <Search
                    placeholder=" search "
                    onSearch={value => console.log(value)}
                    onChange ={(e)=>this.SearchData(e)}
                    style={{ width: 150 }}
                    className="search_box_container"
                    />
                    <div className="ml-2"><img className="header_icons" ></img>
                       <ReactSVG   
                       onClick={this.generatepdf}
                       src={pdf} 
                       style={{ marginRight: "15px", marginLeft: "15px",marginTop:"-9px" ,cursor:"pointer"}}/>
                    </div>
                    <div className="">
                      {this.state.wk_mh_yr_Data.length === 0 ?<ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" ,cursor:"pointer" }} />:
                      <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" ,cursor:"pointer" }} />}>
                        <ExcelSheet dataSet={multiDataSet} name="Uploaded Details"/>
                    </ExcelFile>
                     }
                      </div>
                 
                 {this.state.wk_mh_yr_Data.length === 0 ?
                    <ReactSVG src={print} onClick={this.Notification} style ={{cursor:"pointer"}} />:
                    <ReactToPrint
                    trigger={() => <ReactSVG src={print} style ={{cursor:"pointer"}}  />}
                    content={() => this.componentRef}
                  />
                    }
                     
                  <div style={{ display: "none" }}>
                    <PrintData printTableData={this.state.wk_mh_yr_Data} ref={el => (this.componentRef = el)} />
                  </div>
                </div>
            </div>
        
          </div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "room_type", label: "Room Type" },
            { id: "cancel", label: "Cancelled Date" },
            { id: "time", label: "Time" },
          ]}
          // rowdata={this.state.wk_mh_yr_Data && this.state.wk_mh_yr_Data}
          rowdata={ CancelsearchData.length ===  0 ? []: CancelsearchData}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          VisibilityIcon="close"
          Workflow="close"
          props_loading={false}
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
      </Spin>
    );
  }
}

export default DashboardTable;
