import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ManageServiceModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Air_condition from "../../Images/air condition.svg";
import { Card } from "@material-ui/core";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import { Upload, message } from "antd";
import dateFormat from 'dateformat';
import { NavLink } from "react-router-dom";
import IconsModal from './IconsModal'
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import CloseIcon from '@material-ui/icons/Close';
import profile from '../../Images/1.jpg'
import ValidationLibrary from "../../helpers/validationfunction";
import Axios from "axios";
import {apiurl} from "../../App";
import {Tag,Select} from 'antd';
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class ManageServiceModal extends Component {
  constructor(props) {
   super(props);
     this.state = {
      loading: false,
      images:[],
      open:false,
      editopen:false,
      imageUrl:"",
      tagData:[],
      Roomnos:[],
      quantitity_nos:[],
      Managerooms:{
       'room_type':{
        'value': '',
        validation: [{ }],
        error: null,
        errmsg: null
      },
      'room_name':{
       'value': '',
        validation: [{  }],
        error: null,
        errmsg: null
      },
      'facilities':{
        'value': '',
        validation: [{}],
        error: null,
        errmsg: null
      },
      'quantitity':{
          'value': '',
           validation: [{ }],
           error: null,
           errmsg: null
      },
        'no_of_rooms':{
          'value': '',
           validation: [{ }],
           error: null,
           errmsg: null
      },
        'charge_day':{
          'value': '',
           validation: [{ }],
           error: null,
           errmsg: null
       },
        'from_date':{
          'value': '',
           validation: [{ }],
           error: null,
           errmsg: null
       },
        'to_date':{
          'value': '',
           validation: [{ }],
           error: null,
           errmsg: null
        },      
    }
  }
 
  };
  
  componentDidMount() { 
    // Assigning Edit Data
    console.log(this.state.editData,"totaldata")
    const {editData,editopenModal} = this.props;    
    }


    // validation part
    checkValidation = () => {
      var Managerooms = this.state.Managerooms;
      var packageKeys = Object.keys(Managerooms);
      console.log(packageKeys);
      for (var i in packageKeys) {
          var errorcheck = ValidationLibrary.checkValidation(Managerooms[packageKeys[i]].value, Managerooms[packageKeys[i]].validation);
          console.log(errorcheck);
          Managerooms[packageKeys[i]].error = !errorcheck.state;
          Managerooms[packageKeys[i]].errmsg = errorcheck.msg;
      }
      var filtererr = packageKeys.filter((obj) =>
      Managerooms[obj].error == true);
      console.log(filtererr.length)
      if (filtererr.length > 0) {
          this.setState({ error: true })
      } else {
          this.setState({ error: false })
          this.onSubmitData()
      }
      this.setState({ Managerooms })
     
  }
  changeDynamic = (data, key) => { 
      var Managerooms = this.state.Managerooms;
      var errorcheck = ValidationLibrary.checkValidation(data, Managerooms[key].validation);
      Managerooms[key].value = data;
      Managerooms[key].error = !errorcheck.state;
      Managerooms[key].errmsg = errorcheck.msg;
      this.setState({ Managerooms });
      this.setState({})
      console.log(this.state.Managerooms.facilities,"sss")
  }
  onSubmitData=()=>{
    // alert("ed")
    var RoomApiData={
      br_room_type:this.state.Managerooms.room_type,
      br_room_name:this.state.Managerooms.room_name,
      br_quanity:this.state.Managerooms.no_of_rooms,
      br_charge_per_day:this.state.Managerooms.charge_day,
      br_from_date:this.state.Managerooms.from_date,
      br_to_date:this.state.Managerooms.to_date,
      br_vendor_id:18,
      roomFacility:[
        {
          
        }
      ],
      uploadFile:this.state.imageUrl
    }
    console.log(this.state.Managerooms.facilities,"ff")
  

    if(this.props.editData){
      this.PackageUpdateApi()   // Update Api Call
    }else{
      this.RoomInsertApi(RoomApiData)
      // Insert Api Call
    }
    this.props.closemodal()
  
  }
  RoomInsertApi =(RoomApiData)=>{
    alert("dd")
    Axios({
      method:"POST",
      url:apiurl+'addRooms',
      data:{
        ...RoomApiData
      }
    })
    .then((response)=>{
      console.log(response,"resss")
    })
  }

  tagClick=()=>{
    // alert("tag")
    console.log(this.state.Managerooms.facilities.value,"ppp")
    var tagData =[];
    var tagData_list =[];
    var customid = this.state.tagData.length

    tagData.push(...this.state.tagData,
    <div >{this.state.Managerooms.facilities.value} <span>{this.state.Managerooms.quantitity.value}</span></div>
    
      )
      this.state.Managerooms.facilities.value =""
      this.state.Managerooms.quantitity.value ="  "
      this.setState({tagData:tagData,tagData_list:tagData_list})
      this.setState({ open: true });
  
      console.log(this.state.tagData,"tag_chkk")

  }

  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          images: [...this.state.images,imageUrl],
          loading: false,
        }),
      );
    }
  };

  Roomnos=()=>{
    // alert("ifdd")
    var rooms =[];
    for(let i =1; i<= 50; i++){
      rooms.push(i)
    }
    return rooms
  }

  quantitity_nos=()=>{
    var quantitity =[];
    for (let i=1; i<=10;i++){
      quantitity.push(i)
    }
    return quantitity
  }

  render() {
    const uploadButton = (
      
      <div>
        {this.state.loading ? <></> : <></>}
      </div>
    );
    const { imageUrl } = this.state;
    const Current_date=(dateFormat(new Date(),"dd mmm yyyy"))

    console.log(this.state.tagData,"TagDattaaa")
    return (
      <div className="manage_service">
         <Grid container spacing={2}>
{/*FIRST GRID  */}
           <Grid item md={5} sm={12}>
             <Grid container>
                <Grid item md={5} sm={4}>
                  <div className="clinictotal_div w-100">
                      <Labelbox className="label-box"
                       labelname="Room Type" 
                       type="text"
                       changeData={(data) => this.changeDynamic(data, 'room_type')}
                       value={this.state.Managerooms.room_type.value}
                       error={this.state.Managerooms.room_type.error}
                       errmsg={this.state.Managerooms.room_type.errmsg}  />
                  </div>
                </Grid>
                <Grid item md={1}/>
                <Grid item md={5} sm={4}>
                  <div className="clinictotal_div w-100">
                    <Labelbox className="label-box" 
                      labelname="Room Name" 
                      type="text"
                      changeData={(data) => this.changeDynamic(data, 'room_name')}
                      value={this.state.Managerooms.room_name.value}
                      error={this.state.Managerooms.room_name.error}
                      errmsg={this.state.Managerooms.room_name.errmsg}
                    />
                
                  </div>
                 </Grid>
                  <Grid item md={5} sm={4} className="mt-3">
                      <div className="clinictotal_div w-100">
                        <Labelbox  className="label-box" 
                          labelname="Facilities"  
                          type="text" 
                          changeData={(data) => this.changeDynamic(data, 'facilities')}
                          value={this.state.Managerooms.facilities.value}
                          error={this.state.Managerooms.facilities.error}
                          errmsg={this.state.Managerooms.facilities.errmsg} 
                        />
                      </div>
                    </Grid>
                    <Grid item md={1}/>
                    <Grid item md={2} sm={4} className="mt-3">
                      <div className="clinictotal_div w-100">
                        <Labelbox className="label-box" 
                          labelname="Quantitity" 
                          type="select"
                          changeData={(data) => this.changeDynamic(data, 'quantitity')}
                          value={this.state.Managerooms.quantitity.value}
                          error={this.state.Managerooms.quantitity.error}
                          errmsg={this.state.Managerooms.quantitity.errmsg} 
                          dropdown={this.quantitity_nos()}>
                            </Labelbox>
                      
                      </div>
                    </Grid>
                    <Grid item md={1} sm={4} className="mt-3 ml-4">
                    <label className="ac_icon">Icon</label>
                      <div className="border_adjust">
                       <img className="air_condition" src={Air_condition} alt={"chill"} />
                      </div>
                  </Grid>
                  <Grid item md={2} sm={2} className="icon_color">
                      {/* <AddBoxSharpIcon className="addicon_color" onClick={this.handleClickopen} /> */}
                      <AddBoxSharpIcon className="addicon_color" onClick={this.tagClick} />
                  </Grid>
                  
                  <div className = "ddd">
                    {this.state.tagData.map((val)=>{
                      return(
                        <div className ="tag_align_div">
                            <Tag closable className ="ccc"> {val} </Tag>
                        </div>
                      )
                    })}
                  
                  </div>
               
              </Grid>
            </Grid>
{/* SECOND DATA */}
        <Grid item md={6} sm={12} className="ml-5">
           <Grid container className="media_adjust">
              <Grid item md={4} sm={4} >
                <div className="clinictotal_div w-100 ">
                    <Labelbox className="label-box" labelname="No.of Rooms"
                      type ="select"
                      changeData={(data) => this.changeDynamic(data, 'no_of_rooms')}
                         value =  {this.state.Managerooms.no_of_rooms.value}
                        dropdown={this.Roomnos()}>
                      </Labelbox>                  
                     
                </div>
              </Grid>
              <Grid md={1}/>
              <Grid item md={4} sm={4} className="">
                <div className="clinictotal_div w-100 charge_day">
                  <Labelbox className="label-box" 
                    labelname="Charge/Day" 
                    type="number"
                    changeData={(data) => this.changeDynamic(data, 'charge_day')}
                    value={this.state.Managerooms.charge_day.value}
                    error={this.state.Managerooms.charge_day.error}
                    errmsg={this.state.Managerooms.charge_day.errmsg} 
                  />
                  <div className ="kwd_align_manage"><span>KWD</span></div>
                </div>
              </Grid>
              <Grid md={1}/>
              <Grid item md={4} sm={4} className="mt-3">
                <div className="clinictotal_div w-100">
                  <Labelbox className="label-box" 
                    labelname="From Date"
                    type="datepicker"
                    changeData={(data) => this.changeDynamic(data, 'from_date')}
                    value={this.state.Managerooms.from_date.value}
                    error={this.state.Managerooms.from_date.error}
                    errmsg={this.state.Managerooms.from_date.errmsg} />
                 </div>
              </Grid>
              <Grid md={1}/>
              <Grid item md={4} sm={4} className="mt-3">
                <div className="clinictotal_div w-100">
                  <Labelbox   className="label-box" 
                    labelname="To Date"
                    type="datepicker"
                    changeData={(data) => this.changeDynamic(data, 'to_date')}
                    value={this.state.Managerooms.to_date.value}
                    error={this.state.Managerooms.to_date.error}
                    errmsg={this.state.Managerooms.to_date.errmsg} 
                   />
                 </div>
              </Grid>
              <Grid item md={8} sm={4}>
                <div className="presc_labelbox">
                     <div className="presc_inputbox">
          
                        <label className="ac_icon">Upload image/Video</label>
                       <Upload className="presc_browse_files"
                          name="avatar"
                          listType="picture-card"
                          // className="avatar-uploader"
                          showUploadList={false}
                          multiple={true}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={beforeUpload}
                          onChange={this.handleChange}
                        >                      
                            {/* <div> */}
                                {/* <input type="text"></input> */}
                                {/* <p>Click here!!!</p> */}
                            {/* </div> */}
                          <Button className="browse_button">Browse</Button>
                        </Upload>
                     </div>
                </div>
                <Grid container spacing={1} className ="">
  {/* Images.length  === 0*/}
                  { 
                   this.state.images.length === 0 ?
                      <div className ="row">
                        {
                          this.state.images ? this.state.images.map((img) => (
                              <div className ="col-sm-4 card_align_manage">
                                <div className ="card "> 
                                  <div className="presc_images">
                                    <CloseIcon className="close_icon_addmodal_manage"/>
                                      <div>
                                        <img src={img}  className ="div_image_browse"/>
                                      </div>
                                  </div>
                                </div>
                              </div>
                          )) : uploadButton
                        }
                      </div>
                  :
//  Images .length != 0
                  <div className ="row browse_scroll_align">
                       {
                         this.state.images ? this.state.images.map((img) => (
                          <div className ="col-sm-4 card_align_manage">
                            <div className ="card "> 
                              <div className="presc_images">
                                <CloseIcon className="close_icon_addmodal_manage"/>
                                <div>
                                  <img src={img}  className ="div_image_browse"/>
                                </div>
                               </div>
                            </div>
                          </div>
                         )) : uploadButton
                       }
                  </div>
                }
   
                 </Grid>
              </Grid>
            </Grid>
        </Grid>
      </Grid>

            <Grid container>
              <Grid item md={6} sm={12} className="button_grid">
               <div className="clinicbutton-container">
                  <Button className="clinicCancel"  onClick={this.props.closemodal} >Cancel</Button>
                  <Button className="clinicSubmit"  onClick={this.checkValidation}>Submit</Button>
               </div>
              </Grid>
             </Grid>
          
             <Modalcomp  visible={this.state.open}  xswidth={"md"}  clrchange="text_clr_change" title={""} closemodal={(e)=>this.handleClickclose(e)}>
                 <IconsModal className="iconmodal_modal" open={this.state.open} tagData = {this.state.tagData} onClose={this.handleClickclose}/>
             </Modalcomp>
    
      </div>
    );
  }
}
