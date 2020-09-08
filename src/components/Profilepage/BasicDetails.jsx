
// import React, { Component } from "react";
// import { Select,Upload } from "antd";
// import "antd/dist/antd.css";
// import Moment from "react-moment";
// import Paper from "@material-ui/core/Paper";
// // import './PharmacyEntryMaster'
// import Grid from "@material-ui/core/Grid";
// import Labelbox from "../../helpers/labelbox/labelbox";
// import Button from "@material-ui/core/Button";
// import "./BasicDetails.css";
// import ValidationLibrary from '../../helpers/validationfunction';
// import { message,notification} from "antd";
// import Axios from "axios";
// import { apiurl } from "../../App";

// export default class BasicDetails extends React.Component {
//   state={
//     open:"",
//     Address:"",
//     editId:"",
//     ProfileEditData: {
//       'Address': {
//         'value': '',
//         validation: [{ 'name': 'required'},{'name':'address'}],
//         error: null,
//         errmsg: null
//       },
//       'Contact': {
//         'value': '',
//         validation: [{ 'name': 'required' }],
//         error: null,
//         errmsg: null
//       },
//       'Website': {
//         'value': '',
//         validation: [{ 'name': 'required' },{'name':'webUrl'}],
//         error: null,
//         errmsg: null
//       },
//       'Mobile': {
//         'value': '',
//         validation: [{ 'name': 'required' },{'name':'mobile'}],
//         error: null,
//         errmsg: null
//       },
//       'Email': {
//         'value': '',
//         validation: [{ 'name': 'required' },{'name':'email'}],
//         error: null,
//         errmsg: null
//       }
//     }
//   }
//   handleClose=()=>
//   { 
//     this.props.closemodal()
//   } 
//   componentDidMount(){
//     const {EditData,EditOpen}=this.props
//     console.log("ghgj",EditData)
//     if(EditOpen===true){
//       // this.state.editId=EditData[0].vendorId
//     this.state.ProfileEditData.Address.value=EditData[0].vendor_address
//     this.state.ProfileEditData.Contact.value=EditData[0].vendor_contact
//     this.state.ProfileEditData.Website.value=EditData[0].vendor_website 
//     this.state.ProfileEditData.Mobile.value=EditData[0].vendor_contact_mobile   
//     this.state.ProfileEditData.Email.value=EditData[0].vendor_contact_email 
//     }
//     this.setState({})
    
//   }
//     changeDynamic = (data, key) => {
//       var ProfileEdit = this.state.ProfileEditData;
//       var errorcheck = ValidationLibrary.checkValidation(data, ProfileEdit[key].validation);
//       ProfileEdit[key].value = data;
//       ProfileEdit[key].error = !errorcheck.state;
//       ProfileEdit[key].errmsg = errorcheck.msg;
//       this.setState({ ProfileEdit });
//     }
//     // Notification = (description) => {
 
//     //   notification.success({
//     //       message: 'Success',
//     //       description,
//     //       onClick: () => {
//     //         console.log('Clicked!');
//     //       },
//     //     });
//     // }
//     EditProfileApi=()=>{
//       // console.log(this.props.Image.originFileObj,"image")
//       var formData = new FormData()
//       if (this.props.imageChanged === true) {

//           for (let i in this.props.Image) {
//               formData.append('uploadFile', this.props.Image[i].originFileObj)
//               console.log("formdafdsfsdf", this.props.Image[i].originFileObj)
//           }

//       }else{
//           formData.append('uploadFile', '')
//       }
//       formData.set('address', this.state.ProfileEditData.Address.value)
//       formData.set('mobile', this.state.ProfileEditData.Mobile.value)
//       formData.set('email', this.state.ProfileEditData.Email.value)
//       formData.set('website', this.state.ProfileEditData.Website.value)
//       formData.set('contact', this.state.ProfileEditData.Contact.value)
//       formData.set('modifiedby', 1)
//       formData.set('brvendorId', this.props.EditId)
//       Axios({
//         method: 'POST',
//         url: apiurl + "BookRoom/editbookroomvendorprofile",
//         data:formData
         
//     }).then((response) => {
//       console.log("response",response)
//       // window.location.reload(false)
//      this.props.ProfileGetApi()
//      notification.info({
//       description:
//         "Profile Updated Successfully",
//       placement: "topRight",
//     });
//      console.log(this.props.ProfileGetApi,"pro_edit_api_chk")
//     }).catch((error) => {
        
//     })
//     this.props.closemodal()
//     }

//   render() {
   
//     console.log(this.props.EditData,"editdata")
//     return (
//       <div className="basic_detailsmodal">
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <div className="basic_address_details text_edit">
//               <Labelbox type="text" 
//                 labelname="Address"
//                 changeData={(data) => this.changeDynamic(data, 'Address')}
//                 value={this.state.ProfileEditData.Address.value}
//                 error={this.state.ProfileEditData.Address.error}
//                 errmsg={this.state.ProfileEditData.Address.errmsg}
//               />
//               <Labelbox
//                 type="text"
//                 labelname="Contact Person"
//                 changeData={(data) => this.changeDynamic(data, 'Contact')}
//                 value={this.state.ProfileEditData.Contact.value}
//                 error={this.state.ProfileEditData.Contact.error}
//                 errmsg={this.state.ProfileEditData.Contact.errmsg}
//               />
//               <Labelbox
//                 type="text"
//                 labelname="Website"
//                 changeData={(data) => this.changeDynamic(data, 'Website')}
//                 value={this.state.ProfileEditData.Website.value}
//                 error={this.state.ProfileEditData.Website.error}
//                 errmsg={this.state.ProfileEditData.Website.errmsg}
//               />
//               {/* <Labelbox type="text" labelname="Pincode"/> */}
//             </div>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <div className="basic_address_details text_edit">
//               <Labelbox type="number"
//                 labelname="Mobile Number"
//                 changeData={(data) => this.changeDynamic(data, 'Mobile')}
//                 value={this.state.ProfileEditData.Mobile.value}
//                 error={this.state.ProfileEditData.Mobile.error}
//                 errmsg={this.state.ProfileEditData.Mobile.errmsg}
//               />
//               <Labelbox type="text" 
//                 labelname="Email Id" 
//                 changeData={(data) => this.changeDynamic(data, 'Email')}
//                 value={this.state.ProfileEditData.Email.value}
//                 error={this.state.ProfileEditData.Email.error}
//                 errmsg={this.state.ProfileEditData.Email.errmsg}
//                />
           
//             </div>
//           </Grid>
//           <Grid item xs={12} md={12} className="profile_cont">
//           <Button className="profile_Cancel"  onClick={() => this.props.closemodal(false)}>Cancel</Button>
//             <Button
//               className="profile_Submit"
//               onClick={this.EditProfileApi}
//             >
//              Update
//             </Button>
//             {/* <i class="fa fa-upload" aria-hidden="true"></i> */}
            
//             </Grid>
//           <Grid item xs={12} md={6}></Grid>
//         </Grid>
//       </div>
//     );
//   }
// }











import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './BasicDetails.css';
// import './ProfileModal.css';
import axios from 'axios';
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from '../../App';
import {notification} from 'antd';

export default class BasicDetails extends React.Component {
  state = {
    open: "",
    basicDetails: {
      'address': {
        'value': '',
        validation: [{ 'name': 'required' },{'name':'address'}],
        error: null,
        errmsg: null
      },
      'contactPerson': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'website': {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'webUrl' }],
        error: null,
        errmsg: null
      },
      'mobileNumber': {
        'value': '',
        validation: [{ 'name': 'required' }],
        error: null,
        errmsg: null
      },
      'email': {
        'value': '',
        validation: [{ 'name': 'required' }, { 'name': 'email' }],
        error: null,
        errmsg: null
      }
    }
  }

  componentDidMount() {
    // const {EditData,EditOpen}=this.props
    console.log("ProfileGetdata", this.props.ProfileGetdata)
    this.setProfileData();
  }

  setProfileData = () => {
    this.state.basicDetails.address.value = this.props.ProfileData[0].vendor_address
    this.state.basicDetails.contactPerson.value = this.props.ProfileData[0].vendor_contact
    this.state.basicDetails.website.value = this.props.ProfileData[0].vendor_website
    this.state.basicDetails.mobileNumber.value = this.props.ProfileData[0].vendor_phone
    this.state.basicDetails.email.value = this.props.ProfileData[0].vendor_email
    this.setState({})
  }

  checkValidation = () => {
    var basicDetails = this.state.basicDetails;
    var basicDetailsKeys = Object.keys(basicDetails);
    console.log(basicDetailsKeys);
    for (var i in basicDetailsKeys) {
      var errorcheck = ValidationLibrary.checkValidation(basicDetails[basicDetailsKeys[i]].value, basicDetails[basicDetailsKeys[i]].validation);
      console.log(errorcheck);
      basicDetails[basicDetailsKeys[i]].error = !errorcheck.state;
      basicDetails[basicDetailsKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = basicDetailsKeys.filter((obj) =>
      basicDetails[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.onSubmitData()
    }
    this.setState({ basicDetails })
  }
  changeDynamic = (data, key) => {
    var basicDetails = this.state.basicDetails;
    var errorcheck = ValidationLibrary.checkValidation(data, basicDetails[key].validation);
    basicDetails[key].value = data;
    basicDetails[key].error = !errorcheck.state;
    basicDetails[key].errmsg = errorcheck.msg;
    this.setState({ basicDetails });
    this.setState({})
  }


  onSubmitData = () => {
    var formData = new FormData()
    if (this.props.imageChanged === true) {

      for (let i in this.props.imageData) {
        formData.append('uploadFile', this.props.imageData[i].originFileObj)
        console.log("formdafdsfsdf", this.props.imageData[i].originFileObj)
      }

    } else {
      formData.append('uploadFile', '')
    }
    formData.set('address', this.state.basicDetails.address.value)
    formData.set('mobile', this.state.basicDetails.mobileNumber.value)
    formData.set('email', this.state.basicDetails.email.value)
    formData.set('website', this.state.basicDetails.website.value)
    formData.set('contact', this.state.basicDetails.contactPerson.value)
    formData.set('brvendorId', this.props.EditId)
    formData.set('modifiedby', 1)
    axios({
      method: 'POST',
      url: apiurl + 'BookRoom/editbookroomvendorprofile',
      data: formData
    }).then((response) => {
      this.props.onClose()
      this.props.ProfileGetApi()
      notification.info({
        description:
          "Profile Updated Successfully",
        placement: "topRight",
      });
      console.log(response, "responseCheckProfile")
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const ProfileGetdata = this.props
    console.log(ProfileGetdata, "ProfileGetdata")
    return (
      <div className="basic_details_container">
        <div className="row">
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Address"
              changeData={(data) => this.changeDynamic(data, 'address')}
              value={this.state.basicDetails.address.value}
              error={this.state.basicDetails.address.error}
              errmsg={this.state.basicDetails.address.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Mobile Number"
              changeData={(data) => this.changeDynamic(data, 'mobileNumber')}
              value={this.state.basicDetails.mobileNumber.value}
              error={this.state.basicDetails.mobileNumber.error}
              errmsg={this.state.basicDetails.mobileNumber.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Contact Person"
              changeData={(data) => this.changeDynamic(data, 'contactPerson')}
              value={this.state.basicDetails.contactPerson.value}
              error={this.state.basicDetails.contactPerson.error}
              errmsg={this.state.basicDetails.contactPerson.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Email Id"
              changeData={(data) => this.changeDynamic(data, 'email')}
              value={this.state.basicDetails.email.value}
              error={this.state.basicDetails.email.error}
              errmsg={this.state.basicDetails.email.errmsg}
            />
          </div>
          <div className="col-md-6 basicdetails_child">
            <Labelbox type="text" labelname="Website"
              changeData={(data) => this.changeDynamic(data, 'website')}
              value={this.state.basicDetails.website.value}
              error={this.state.basicDetails.website.error}
              errmsg={this.state.basicDetails.website.errmsg}
            />
          </div>
        </div>
        <div className="buttons_container">
          <div>
            <div>
              <Button className="cancel_button" variant="contained" onClick={() => this.props.onClose()}>Cancel</Button>
            </div>
          </div>
          <div>
            <div>
              <Button className="update_button" variant="contained" color="primary" onClick={this.checkValidation}>Update</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
