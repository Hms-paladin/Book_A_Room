// import React from 'react';
// import {Modal, Button} from 'antd';
// // import icon_img from '../../Images/icon.svg';
// import './IconsModal.css';
// import icon_img from '../../Icons/baseline-airplay-24px.svg';
// import Car from '../../Icons/car.svg'
// import Upload from '../../Icons/upload.svg';
// import Android from '../../Icons/android.svg';
// import StandWifi from '../../Icons/standwifi.svg';
// import Heart from '../../Icons/heart.svg';
// import Glass from '../../Icons/cheersglass.svg'
// import Book from '../../Icons/book.svg'
// import Simply from '../../Icons/Path 250.svg';
// import Music from '../../Icons/music.svg';
// import Wifi from '../../Icons/wifi.svg'
// import Trolly from '../../Icons/trolly.svg'
// import Lock from '../../Icons/lock.svg';
// import CD from '../../Icons/cd.svg';
// import Grid from "@material-ui/core/Grid";

// class IconsModal extends React.Component{
//     state = { 
//         visible: true,
//         icons:[
//           {
//             id:1,
//             icon_img:<img src={icon_img} />,
//             name:"tv"

//           },
//           {
//             id:2,
//             icon_img:<img src = {Car}/>,
//             name:"car"
//           },
//           {
//             id:3,
//             icon_img:<img src = {Upload}/>,
//             name:"upload"
//           },
//           {
//             id:4,
//             icon_img:<img src = {Android}/>,
//             name:"android"
//           },
//           {
//             id:5,
//             icon_img:<img src = {StandWifi}/>,
//             name:"stadwifi"
//           },
//           {
//             id:6,
//             icon_img:<img src = {Heart}/>,
//             name:"heart"
//           },
//           {
//             id:7,
//             icon_img:<img src = {Glass}/>,
//             name:"glass"
//           },
//           {
//             id:8,
//             icon_img:<img src = {Book}/>,
//             name:"book"
//           },
//           {
//             id:9,
//             icon_img:<img src = {Simply}/>,
//             name:"simply"
//           },
//           {
//             id:10,
//             icon_img:<img src = {Music}/>,
//             name:"music"
//           },
//           {
//             id:11,
//             icon_img:<img src = {Wifi}/>,
//             name:"wifi"
//           },
//           {
//             id:12,
//             icon_img:<img src = {Trolly}/>,
//             name:"trolly"
//           },
//           {
//             id:13,
//             icon_img:<img src = {Lock}/>,
//             name:"lock"
//           },
//           {
//             id:14,
//             icon_img:<img src = {CD}/>,
//             name:"cd"
//           },
//         ]
//      };
// iconclicked=(val)=>{
//   console.log(val,"vallll")
//   this.setState({[val]:val});
//   // alert("sara")
// }
 
//     render(){
//       const TagData = this.props
//       console.log(this.props.tagData,"props_tag")
//         return(
//            <>
//           <div >
//             <div  className="overside" >
          
//               <div className="row">
//                 {
//                   this.state.icons.map((val)=>{
//                     return(
//                       <div className="col-sm-3 mt-3">
//                         {
//                          <div className={`${this.state[val.name]===val.name && "back_red"} border_icon `} onClick={(e)=>this.iconclicked(val.icon_img)}>
//                            <div className={""}>{ val.icon_img}</div>
//                          </div>
//                         }
//                       </div>
//                     )
//                   })
//                 }
//               </div>
              // <div className ="add_more_icons_manage">
              //     <p>Add more icons</p>
              // </div>
//             </div>  
//           </div>
//            </>
//         )
//     }
// }
// export default IconsModal;


import React from 'react';
import {Modal, Button} from 'antd';
// import icon_img from '../../Images/icon.svg';
import './IconsModal.css';
import icon_img from '../../Icons/baseline-airplay-24px.svg';
import Car from '../../Icons/car.svg'
import Upload from '../../Icons/upload.svg';
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
import Grid from "@material-ui/core/Grid"
class IconsModal extends React.Component{
    state = { 
        TagData_icon : [],
        // TagData:[],
        visible: true,
        icons:[
          {
            id:1,
            icon_img:<img src={icon_img} />,
            name:"tv"

          },
          {
            id:2,
            icon_img:<img src = {Car}/>,
            name:"car"
          },
          {
            id:3,
            icon_img:<img src = {Upload}/>,
            name:"upload"
          },
          {
            id:4,
            icon_img:<img src = {Android}/>,
            name:"android"
          },
          {
            id:5,
            icon_img:<img src = {StandWifi}/>,
            name:"stadwifi"
          },
          {
            id:6,
            icon_img:<img src = {Heart}/>,
            name:"heart"
          },
          {
            id:7,
            icon_img:<img src = {Glass}/>,
            name:"glass"
          },
          {
            id:8,
            icon_img:<img src = {Book}/>,
            name:"book"
          },
          {
            id:9,
            icon_img:<img src = {Simply}/>,
            name:"simply"
          },
          {
            id:10,
            icon_img:<img src = {Music}/>,
            name:"music"
          },
          {
            id:11,
            icon_img:<img src = {Wifi}/>,
            name:"wifi"
          },
          {
            id:12,
            icon_img:<img src = {Trolly}/>,
            name:"trolly"
          },
          {
            id:13,
            icon_img:<img src = {Lock}/>,
            name:"lock"
          },
          {
            id:14,
            icon_img:<img src = {CD}/>,
            name:"cd"
          },
        ]
     };
iconclicked=(val)=>{
  console.log(val,"valllll")
  var TagData_icon = [];
  TagData_icon.push(val)

  this.setState({[val]:val,
    TagData_icon:TagData_icon});
console.log(this.state.TagData_icon,"tag_icon")
  // alert("sara")
}

 

    render(){
      const TagData = this.props
      console.log(TagData,"props_tag")
        return(
           <>
          <div >

          
            <div  className="overside" >
             
              <div className="row">
                {
                  this.state.icons.map((val)=>{
                    return(
                      <div className="col-sm-3 mt-3">
                        {
                         <div className={`${this.state[val.name]===val.name && "back_red"} border_icon `} onClick={(e)=>this.iconclicked(val.name)}>
                           <div className={""}>{ val.icon_img}</div>
                           </div>
                        }
                      </div>
                    )
                  })
                }
              </div>
           
              <div className ="add_more_icons_manage">
                  <p>Add more icons</p>
              </div>
              <div>{this.state.val}</div>

            </div>  
      </div>
           </>
        )
    }
}
export default IconsModal;