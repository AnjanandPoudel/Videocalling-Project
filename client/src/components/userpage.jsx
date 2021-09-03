import { Link, Router } from "react-router-dom";
import {Button, Form, Input, Modal, ModalBody, ModalHeader,Label,Row,Col, NavLink} from 'reactstrap';
import React, {Component} from 'react';
import { baseurl } from "../redux/baseURL";
import {Control, LocalForm} from 'react-redux-form'

    
function RenderUser(props){
   if(props.userinformation){
    return(
        <div className=" mid mt-2 abel">
            
            <span>Contact email : {props.userinformation.email} </span><br/>
            <span>Address: {props.userinformation.address} </span><br/>
            <span>Studying, {props.userinformation.Education} </span><br/>
            <span>From, {props.userinformation.EducationPlace} </span><br/>
            <span>{props.userinformation.academicDetail} </span><br/>
            
        </div>
    )
   }
   else{
       return(
           <div className="">
                <span>Contact email : N/A   </span><br/>
                <span>Address: N/A </span><br/>
                <span>Studying,  N/A  </span><br/>
                <span>From, N/A  </span><br/>
                <span> </span><br/>
           </div>
       )
   }
}



function UserPage(props){    
    console.log(props.userinformation)
    return(
        <div className="">
              <MoreButton />
            <div className="container-fluid bg-course ">
                <div className="row m-2">
                    
                    <div className="row col-md-9">
                    {props.userinformation ?
                        <div className="userimageround  ">
                            <img className="userimage" src={baseurl+props.userinformation.image} alt="pp"/>
                        </div>
                        :
                        <div className="userimageround  ">
                            <img className="userimage" src="images/q.jpg" alt=""/>
                        </div>
                    }
                        {props.auth.userinfo ?
                        <div className="userinfo col-7 p-0"> 
                            <h5 className="abel mt-5 d-flex flex-wrap justify-content-between">
                                <span>{props.auth.userinfo.username}</span>
                                <UserEditButton  userinformation={props.userinformation} putUserInfo={props.putUserInfo}  />
                            </h5>
                            <hr/>

                            <span>
                                <RenderUser userinformation={props.userinformation} />
                            </span>
                            <br/>
                            <span className="bold abel big m-0 p-0">Some description</span>
                            <br/>
                            <span className="smalltext hel">
                            {props.userinformation?props.userinformation.description:null}
                            </span>
                        </div>
                            :
                            <div className="card p-5 m-0">
                                <h3>This error may be due to session expiration. Try relogging </h3>
                            </div>
                        }
                            <div className="usercard p-3 m-5 card">
                                <div className="cardtitle">
                                    Google map
                                </div>
                                <div className="cardbody ">
                                    This is card body
                                    <img src={baseurl+ "assets/605d7d247ad6303ba489b79d___1617708881147___Screenshot (3).png"} alt=""/>
                                </div>
                            </div>
                    </div>

                 <div className=" col-md-3">
                 <h5>HISTORY CALLS:</h5>
                 <hr/>
                 <PopularPosts  />
                  <PopularPosts  />
                  <PopularPosts  />
                 </div>
                </div>
               
            </div>
    </div>
    )
}


function PopularPosts(){
    return(
        <div className="popular-posts ">
        <div className="">
            <img src="images/q.jpg" alt=""/>
            <div className="popularimagebelow">
                <span className="d-flex justify-content-between ">
                  
                   

                </span>
            </div>
        </div>
        <p className="hel bold">
            Call between Admin and Anjan
            
           
        </p>
    </div>
    )
}


function RecentPosts(){
    return(
        <div className="popular-posts m-1 p-1">
        <div className="">
            <img src="images/q.jpg" alt=""/>
            <div className="popularimagebelow">
                <span className="d-flex justify-content-between ">
                    <div className="abel smalltext"> 342 <i className="fa fa-eye  "></i></div>
                    <div className="hel smalltext">4  <i className="fa fa-star  "></i></div>
                    <div className="hel smalltext"> 34 <i className="fa fa-thumbs-up  "></i></div>
                   

                </span>
            </div>
        </div>
        <p className="abel">
            This is something that i dearmed of :
            <br/>
            
        </p>
    </div>
    )
}

class MoreButton extends Component{
    constructor(){
        super()
        this.state={
            clicked:false
        }
    }

    handleClick=()=>{
        this.setState({
            clicked:!this.state.clicked
        })
    }



    render(){
        return(
            <div className="more mt-3 ml-5">
                <Button onClick={this.handleClick}> <i className="fa fa-bars"></i>  More</Button>
                <Modal isOpen={this.state.clicked} toggle={this.handleClick}>
                    <ModalHeader toggle={this.handleClick}>
                        yo mann
                    </ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, tempore.
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
class UserEditButton extends Component{
    constructor(props){
        super(props)
        this.state={
            clicked:false,
            
        }
    }

    handleClick=()=>{
        this.setState({
            clicked:!this.state.clicked
        })
    }
    handleSubmit=(values)=>{
        this.handleClick()
       
        if(this.props.userinformation)
        {
            this.props.putUserInfo({_id:this.props.userinformation._id,
                Education:values.edu,
                Education_place:values.edu_place,
                description:values.edu_descp
                ,email:values.email   
            })
        }
        
        
    }

    handleChangeinput(event){
        let target=event.target;
        let name=target.name;
        let value=target.type ==="checkbox" ? target.checked :target.value  ;
        this.setState({
          [name]:value
        })
   
      }

    render(){
        return(
            <div className="">
                <span className="abel ">  <i className="fa fa-edit   " onClick={this.handleClick} > <span className="smalltext">edit</span>  </i> </span>

                <Modal isOpen={this.state.clicked} toggle={this.handleClick}>
                    <ModalHeader toggle={this.handleClick}>
                       Edit the info:
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}className="form p-2" >
                            
                            <div className="form-group row">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col  md={10}>
                                    <Control.text name="email" model=".email"className="form-control" placeholder={this.props.userinformation?this.props.userinformation.email:null}  />
                                </Col>
                            </div>
                            <div className="form-group row">
                                <Label htmlFor="edu" md={2}>Education</Label>
                                <Col  md={10}>
                                    <Control.text name="edu" model=".edu"className="form-control" placeholder={this.props.userinformation?this.props.userinformation.Education:null} />
                                </Col>
                            </div>
                            <div className="form-group row">
                                <Label htmlFor="edu_place" md={2}>Education Place</Label>
                                <Col  md={10}>
                                    <Control.text name="edu_place" model=".edu_place"className="form-control" placeholder={this.props.userinformation?this.props.userinformation.EducationPlace:null} />
                                </Col>
                            </div>
                            <div className="form-group row">
                                <Label htmlFor="edu_descp" md={2}>Education description</Label>
                                <Col  md={10}>
                                    <Control.textarea rows={4} name="edu_descp" model=".edu_descp"className="form-control"  placeholder={this.props.userinformation?this.props.userinformation.description:null} />
                                </Col>
                            </div>
                            
                            <Button className="btn btn-success text-center " >Submit</Button>
                            <br/><hr/>
                               <div className="na p-2">
                               <Link to={'/courses'} className="btn btn-warning"> Edit the images(profile pics) </Link> <hr />
                                <Link to={'/courses'} className="btn btn-warning"> Edit the UserName </Link>
                               </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default UserPage;