import { Link, Router } from "react-router-dom"
import {Form,Alert} from 'reactstrap'
import React, {Component} from 'react';


function Forms(){
    return(
       <div className="">
           
       </div>
    )
}
    



function Contact(){    
    return(
        <div className="">
            <div className="container-fluid pt-5 bg-course">
                <div className="row">
                    <div className="bg-course col-12 ">
                        <Contactmain />
                        <div className="m-3 cards  d-flex flex-wrap">
                        <Forms />
    
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}


class Contactmain extends Component{

    constructor(props){
       super()
       this.state={
         selectedfile:null,
         name:'',
         email:'',
         subject:'',
         description:''
   
       }
       this.handleChange=this.handleChange.bind(this);
       this.handleChangeinput=this.handleChangeinput.bind(this);
     }
   
   
     handleChange(event){
       this.setState({
         selectedfile:event.target.files[0]
       })
       console.log(this.state.selectedfile);
     }
   
     handleChangeinput(event){
       let target=event.target;
       let name=target.name;
       let value=target.type ==="checkbox" ? target.checked :target.value  ;
   
       this.setState({
         [name]:value
       })
   
   
   
   /*     const formdata=new FormData();
       formdata.append('inputfield',this.state)
   
     //   fetch('http://localhost:3001/courses',{
      // method:'POST',
     //  body:formdata
     //})
       axios.post("api/uploadfile", formdata); 
       console.log(formdata) */
     }
   
   
     handleSubmit=(event)=>{
       
       alert( JSON.stringify(this.state))
       this.props.add_courses(this.state.name,this.state.email,this.state.subject,this.state.descp)
       
     }

     handleAlert=()=>{
      
     }

    render(){ 
    return(
        <div className="App container mt-0">
        <form className="form" action="/courses" encType="multipart/form-data" onSubmit={(values)=>this.handleSubmit(values)} >
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Name:</label>
              <div className="col-sm-10 col-md-5">
                <input type="text" className="form-control" placeholder="name of course" name="name" id="name" value={this.state.name} onChange={this.handleChangeinput}  />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Email:</label>
              <div className="col-sm-10 col-md-5">
                <input type="email" className="form-control" placeholder="example@email.com" name="email" id="email" value={this.state.email}  onChange={this.handleChangeinput} />
              </div>
            </div>
            <div className="form-group sub">
              <label className="control-label col-sm-2" htmlFor="name">Your feedback / problem:</label>
              <div className="col-sm-10  col-md-5">
                <input type="text" className="form-control" placeholder="name of course" name="subject" id="subject" value={this.state.subject} onChange={this.handleChangeinput}   />
              </div>
  
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="description">Your feedback / problem: Description:</label>
              <div className="col-sm-10 ">
                <textarea rows="4" className="form-control" placeholder="description" name="description" id="description"  value={this.state.description} onChange={this.handleChangeinput}   />
              </div>
            </div>
          

{/* 
            <form class="form-inline m-2">
              <div class="form-group m-2">
                <label for="subject">Subject:</label>
                <input type="text" class="form-control" id="subject" placeholder="Enter subject" name="subject"/>
              </div>
              <div class="form-group m-2">
                <label for="grade">Grade:</label>
                <input type="number" class="form-control" id="grade" placeholder="Enter grade" name="grade" />
              </div>
            </form> */}

            <div className="form-group card m-3 p-2">
              <label className="control-label col-sm-2" htmlFor="name">Add a file/img : </label>
              <div className="col-sm-10">
              <input type="file" name="videoname" className="btn btn-warning" onChange={this.handleChange} />
              </div>
            </div>
      
          <button  type="submit" className=" btn btn-success ">Submit</button>
        </form>
        <Alert severity="success" className="alert" > Your data was successfully updated. <span role="button" onClick={this.handleAlert}>x</span> </Alert>
      

      </div>
    );
    }
}


export default Contact;