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
import icon_img from '../../Icons/baseline-airplay-24px.svg';
import Car from '../../Icons/car.svg'
import Uploads from '../../Icons/upload.svg';
import Android from '../../Icons/android.svg';
import StandWifi from '../../Icons/standwifi.svg';
import Heart from '../../Icons/heart.svg';
import Glass from '../../Icons/cheersglass.svg'
import Book from '../../Icons/book.svg'
import Simply from '../../Icons/Path 250.svg';
import Music from '../../Icons/music.svg';
import Wifi from '../../Icons/wifi.svg'
import Trolly from '../../Icons/trolly.svg'
import Lock from '../../Icons/lock.svg';
import CD from '../../Icons/cd.svg';
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  console.log(file,"file")
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJpgOrPng && isLt2M;
  return isJpgOrPng ;

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
      quantity_nos:[],
      selectedimg:icon_img,
      Managerooms:{
       'room_type':{
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'room_name':{
       'value': '',
       validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      
        'no_of_rooms':{
          'value': 1,
           validation: [{ 'name': 'required' }],
           error: null,
           errmsg: null
      },
        'charge_day':{
          'value': '',
           validation: [{}],
           error: null,
           errmsg: null
       },
        'from_date':{
          'value': '',
           validation: [{}],
           error: null,
           errmsg: null
       },
        'to_date':{
          'value': '',
           validation: [{}],
           error: null,
           errmsg: null
        },      
    },
    Manageroomsadd:{
      'facilities':{
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'quantity':{
          'value': 1,
           validation: [{ 'name': 'required' }],
           error: null,
           errmsg: null
      },
  },

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

  checkValidationAdd = () => {
    var Manageroomsadd = this.state.Manageroomsadd;
    var packageKeys = Object.keys(Manageroomsadd);
    console.log(packageKeys);
    for (var i in packageKeys) {
        var errorcheck = ValidationLibrary.checkValidation(Manageroomsadd[packageKeys[i]].value, Manageroomsadd[packageKeys[i]].validation);
        Manageroomsadd[packageKeys[i]].error = !errorcheck.state;
        Manageroomsadd[packageKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = packageKeys.filter((obj) =>
    Manageroomsadd[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
        this.setState({ error: true })
    } else {
        this.setState({ error: false })
        this.tagadd()
    }
    this.setState({ Manageroomsadd })
   
}
changeDynamicadd = (data, key) => { 
    var Manageroomsadd = this.state.Manageroomsadd;
    var errorcheck = ValidationLibrary.checkValidation(data, Manageroomsadd[key].validation);
    Manageroomsadd[key].value = data;
    Manageroomsadd[key].error = !errorcheck.state;
    Manageroomsadd[key].errmsg = errorcheck.msg;
    this.setState({ Manageroomsadd });
    this.setState({})
}

tagadd=()=>{

  var tagdata = {icon:this.state.selectedimg,name:this.state.Manageroomsadd.facilities.value,quantity:this.state.Manageroomsadd.quantity.value}

  var tagData = []
  
  tagData.push(...this.state.tagData,tagdata)

  this.setState({tagData:tagData})

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

  uploadimgDel=(uploadindex)=>{

    var deleteuploadIMG = this.state.images.filter((data,index)=>{
      return index !== uploadindex
    })
  
      this.setState({
        images:deleteuploadIMG
    })

  }

  tagClick=(tagindex)=>{

  var deletetag = this.state.tagData.filter((data,index)=>{
    return index !== tagindex
  })

    this.setState({
    tagData:deletetag
  })

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
    if(info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
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

  quantity_nos=()=>{
    var quantity =[];
    for (let i=1; i<=10;i++){
      quantity.push(i)
    }
    return quantity
  }

  iconchoose=()=>{
    this.setState({open:!this.state.open})
  }

  render() {
    const uploadButton = (<div>{this.state.loading ? <></> : <></>}</div>);

    const Current_date=(dateFormat(new Date(),"dd mmm yyyy"))

    const imgName=[icon_img,Car,Uploads,Android,StandWifi,Heart,Glass,Book,Simply,Music,Trolly,Lock,CD]
    console.log(this.state.tagData,"tagData")
    return (
      <div className="manage_service">
         <Grid container spacing={2}>
{/*FIRST GRID  */}
           <Grid item md={5} sm={12}>
             <Grid container>
                <Grid item md={5} sm={4} className="mr-4">
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
                {/* <Grid item md={1}/> */}
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
                          changeData={(data) => this.changeDynamicadd(data, 'facilities')}
                          value={this.state.Manageroomsadd.facilities.value}
                          error={this.state.Manageroomsadd.facilities.error}
                          errmsg={this.state.Manageroomsadd.facilities.errmsg} 
                        />
                      </div>
                    </Grid>
                    {/* <Grid item md={1}/> */}
                    <Grid item md={3} sm={4} className="mt-3 ml-4">
                      <div className="clinictotal_div w-100">
                        <Labelbox className="label-box" 
                          labelname="Quantity" 
                          type="select"
                          changeData={(data) => this.changeDynamicadd(data, 'quantity')}
                          value={this.state.Manageroomsadd.quantity.value}
                          error={this.state.Manageroomsadd.quantity.error}
                          errmsg={this.state.Manageroomsadd.quantity.errmsg} 
                          dropdown={this.quantity_nos()}>
                            </Labelbox>
                      
                      </div>
                    </Grid>
                    <Grid item md={1} sm={4} className="mt-3 ml-4">
                    <label className="ac_icon">Icon</label>
                      <div className="border_adjust" onClick={this.iconchoose} >
                       <img className="air_condition" src={this.state.selectedimg?this.state.selectedimg:icon_img} />
                      </div>
                  </Grid>
                  <Grid item md={1} sm={2} className="icon_color">
                      <AddBoxSharpIcon className="addicon_color" onClick={this.checkValidationAdd} />
                  </Grid>
                  
                  <div className={"tag_master"}>
                    {this.state.tagData.map((val,index)=>{
                      return(
                        <div className ="tag_container">
                          <img src={val.icon} />
                          <div className="tag_name">{val.name}</div>
                      <div className="tag_quantity">{"\xa0" + "-" + "\xa0" + val.quantity + "\xa0\xa0"}</div>
                          <CloseIcon className="tag_close" onClick={()=>this.tagClick(index)} />
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
              <Grid item md={12} sm={12}>
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
                        <div className="browse_master">
                        <p>My Image.png</p>
                          <Button className="browse_button">Browse</Button>
                          </div>
                        </Upload>
                     </div>
                </div>
                <Grid container spacing={1} className={this.state.images.length > 0 && "roomupload_legend"}>

                  { 
                  <div className="room_master">
                    {
                      this.state.images.map((img,index) => {
                        return (
                        <div className="presc_images">
                             <CloseIcon className="close_icon_addmodal_manage" onClick={()=>this.uploadimgDel(index)} />
                          <div>
                             <img src={img}  className ="div_image_browse"/>
                          </div>
                        </div>  
                      )
                      })
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
          
             <Modalcomp  visible={this.state.open}  xswidth={"md"} modelwidthClass={"iconmodel_baralign"}  clrchange="text_clr_change" title={""} closemodal={(e)=>this.iconchoose(e)}>
                 <IconsModal className="iconmodal_modal" open={this.state.open} selectedicon = {(data)=>this.setState({selectedimg:imgName[data-1]})} onClose={this.iconchoose}/>
             </Modalcomp>
    
      </div>
    );
  }
}
