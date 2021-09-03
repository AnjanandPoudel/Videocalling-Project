import {Button, Form, Input,Row,Col,Label, ModalFooter, Modal, ModalHeader, ModalBody} from 'reactstrap'
import React, { Component } from 'react';
import { Loading } from './Loading';
import PopularPosts from '../composmall/popularposts';
import { baseurl } from '../redux/baseURL';
import { Control, LocalForm } from 'react-redux-form';
import { putCourses } from '../redux/ActionCreators';



class CourseDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            onecourse:props.course, // this should be changed just an eg;
            likes:false,
            likeIncreased:'',
        }
        this.likehandleClick=this.likehandleClick.bind(this)
    }

    likehandleClick(){
        if(this.state.onecourse){
            this.setState({
                likes:!this.state.likes
            })
            if(!this.state.likes){
                this.setState( (prevState)=>( {
                    onecourse:{...prevState.onecourse , id:this.props.course.id , grade:parseInt(this.state.onecourse.grade,10)+1  }
                }))
            }
            else{
                this.setState( (prevState)=>( {
                    onecourse:{...prevState.onecourse , id:this.props.course.id , grade:parseInt(this.state.onecourse.grade,10)-1  }
                }))
            }
            console.log(this.state.onecourse)
        }
        else{
            console.log('no')
        }
    }


  

    render(){
        console.log(this.props)
        if(true){
            return(
            <div className="m-1">
                {/* props is supplied from main */}
               <div className="d-flex">
                <CoursekoDetail course={this.state.onecourse} onClick={this.likehandleClick} errmsg={this.props.errmsg} Loading_courses={this.props.Loading_courses} putCourses={this.props.putCourses} putCourseThumbnail={this.props.putCourseThumbnail} 
                deleteCourse={this.props.deleteCourse}
                
                />
                <PopularPosts />
               </div>
                <Comment course={this.props.course} comments={this.props.comments} onClick={this.likehandleClick} 
                add_comments={this.props.add_comments}  failed_comments={this.props.failed_comments} 
                Loading_comments={this.props.Loading_courses}
                deleteComment={this.props.deleteComment}
                />
            </div>
            )
        }
    }
}


function CoursekoDetail(props){
  

    if(props.Loading_courses){
        return(
            <div className="m-5 col-5 p-5">
                <Loading />
            </div>
        )
    }
    else if(props.errmsg){
        return(
            <div className=" container m-5">
                {props.errmsg}
                <div className=" d-flex flex-wrap">
                        <div className="card col -3 failed_to_fetch" width="40">
                            failed to fetch
                        </div>
                        <div className="card card col -3 failed_to_fetch">
                            failed to fetch
                        </div>
                    </div> 
            </div>
        )
    }

/* 
    Likes: 78
Rate: 3
author: "Author"
description: "This section contains description "
email: "Author@gmail.com"
image: "images/p.png"
videotitle: "Anjan"
*/
    
    else if(props.course){
        console.log(props)

        const handleDelete=()=>{
        props.deleteCourse(props.course._id)
        console.log("delete")
    }

        return(
            <div  className="card m-1 cardVideo col-sm-12 col-md-8 col-lg-8">
                <div className="homevideodiv">
                    <video controls controlsList="nodownload" className="homevideo" id="videoPlayer" src={baseurl+props.course.video} alt="pic"/>
                </div>
                <div className="cardContents mt-1 p-1 d-flex justify-content-between">
                <span className="smalltext">{props.course.Likes} <i onClick={()=>props.onClick()}  className="fa fa-thumbs-up blue " id="likeCourse"></i> </span>
                    <span className="stars">Rating: {props.course.Rate}<i className="fa fa-star yellow starCourse"></i> </span>
                    <p className="smalltext bold">Grade : {props.course.grade?props.course.grade:'grade'} </p>
                    <div className="d-flex">
                        <Thumbnail  course={props.course} putCourseThumbnail={props.putCourseThumbnail}  />
                        <Edit course={props.course} putCourses={props.putCourses} /> 
 
                    </div>
                </div>
                <div className="p-1">
                    <p className="m-0 bold w80">{props.course.name}</p>
                    <div className="d-flex justify-content-between">
                        <p className="m-0 bold">Author: {props.course.author.username}</p>
                        <p className="m-0 bold">Subject: {props.course.subject}</p>
                    </div>
                    <p className="smalltext w80"> {/* <h6>Description</h6> */}{props.course.description} </p>
                    <span href="" onClick={handleDelete} className="red float-right"><i className="fa fa-trash big"> <span className="hel smalltext">Delete</span> </i></span>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className=" container m-5">
            <div className=" d-flex flex-wrap">
                    <div className="card col -3 failed_to_fetch" width="40">
                        Sorry 
                        <h2>This is anjan poudel from headquater, i can't find the error/Course</h2>
                    </div>
                    <div className="card card col -3 failed_to_fetch">
                        Sorry
                        <h2>This is anjan poudel from headquater, i can't find the error/Course</h2>
                    </div>
                </div> 
        </div>
        )
    }
}

class Thumbnail extends Component{
    constructor(){
        super()
        this.state={
            Open:false,
            selectedfile:''
            }
        }

        handleChange=()=>{
            this.setState({
                Open:!this.state.Open,
            })
        }

        handleChangefile=(event)=>{
            this.setState({
                selectedfile:event.target.files[0]
            })
        }

  /*       handleSubmit=(values)=>{     
            this.handleChange()
            values=JSON.stringify(values)
            console.log(values)

        } */

        handleSubmit = (event) => {
            console.log(this.state.selectedfile)
            this.handleChange();
        
            let formData =new FormData();
            formData.append('selectedfile',this.state.selectedfile);
/*             this.props.add_coursethumbnail(formData);
 */           console.log(formData)
            console.log(this.props.course._id)
            this.props.putCourseThumbnail(formData,this.props.course._id)

        }

        render(){
            return(
                <div className="">
                    <div className="thumbnailimage">
                        <img className="pointer" src={baseurl+this.props.course.image} alt="" onClick={this.handleChange} />
                    </div>
                    <span className="abel mr-5  ">  <i className="fa fa-plus   " onClick={this.handleChange} > <span className="smalltext bold mr-5 ">Add thumbnail</span>  </i> </span>

                    <Modal isOpen={this.state.Open} toggle={this.handleChange}>
                        <ModalHeader toggle={this.handleChange}>
                            Add thumbnail
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>{this.handleSubmit(values)}} className="form" >
                                <div className="form-group ">
                                    <Label md={8} htmlFor="name " > Choose thumbnail/image(png/jpg/jpeg/gif) </Label>
                                    <Col>
                                        <Control.file model=".file" md={10} className="form-control btn-warning" placeholder={this.props.course?this.props.course.name:null} onChange={this.handleChangefile}  />
                                    </Col>
                                </div>

                                <Button className="btn btn-success text-center " >Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }

}

class Edit extends Component{
    constructor(){
        super()
        this.state={
            Open:false
            }
        }

        handleChange=()=>{
            this.setState({
                Open:!this.state.Open
            })
        }

        handleSubmit=(values)=>{     
            this.handleChange()
            values=JSON.stringify(values)
            console.log(this.props.course._id)
            alert(values)
            this.props.putCourses(values,this.props.course._id)

        }

        render(){
            console.log(this.props)
            return(
                <div className="">
                    <span className="abel ">  <i className="fa fa-edit bold   " onClick={this.handleChange} > <span className="smalltext">edit</span>  </i> </span>
                    <Modal isOpen={this.state.Open} toggle={this.handleChange}>
                        <ModalHeader toggle={this.handleChange}>
                            Edit the info:
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>{this.handleSubmit(values)}} className="form" >
                                <div className="form-group row">
                                    <Label md={3} htmlFor="name" >Title Name</Label>
                                    <Col>
                                        <Control.text model=".name" className="form-control" placeholder={this.props.course?this.props.course.name:null}  />
                                    </Col>
                                </div>
                                <div className="form-group row">
                                    <Label htmlFor="grade" md={2}>Grade</Label>
                                    <Col  md={10}>
                                        <Control.text model=".grade" className="form-control" placeholder={this.props.course?this.props.course.grade:null}  />
                                    </Col>
                                </div>
                                <div className="form-group row">
                                    <Label htmlFor="subject" md={2}>Subject</Label>
                                    <Col  md={10}>
                                        <Control.text model=".subject" className="form-control" placeholder={this.props.course?this.props.course.subject:null}  />
                                    </Col>
                                </div>
                                <div className="form-group row">
                                    <Label htmlFor="description" md={2}>Description</Label>
                                    <Col  md={10}>
                                        <Control.text model=".description" className="form-control" placeholder={this.props.course?this.props.course.description:null}  />
                                    </Col>
                                </div>

                                <Button className="btn btn-success text-center " >Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    
                </div>
            )
        }
    
}


function Comment(props){

  

    if(props.Loading_comments){
        return(
            <div className="text center p-5 col-5 m-5">
                <Loading />
            </div>
        )
    }
    else if(props.failed_comments){
        return(
            <div className="text-center">
                <h2>{props.failed_comments}</h2>
            </div>
        )
    }


    else if(props.comments){
        let commentarr=props.comments.map(item=>{
            item.createdAt=item.updatedAt.toString()
            

            function formatDate(string){
                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(string).toLocaleDateString([],options);
            }
             
            item.createdAt= formatDate(item.createdAt);
            

            const handleDelete=()=>{
                console.log(item._id)
                props.deleteComment(item._id)
            }

            return(
                <div className="" key={item._id}>
                    <hr className="light" />
                    <div className="p-0  "> 
                        <div className="d-flex justify-content-between flex-wrap m-1">
                            <div className="comment_username">
                                <span className="smalltext bold" > {item.author.username}</span> 
                                <span className="smalltext"> - {item.rating} <i className="fa fa-star yellow"></i> </span> <br/>
                            </div>
                            <span className="smalltext">{item.Likes} <i onClick={()=>props.onClick()}  className=" smalltext fa fa-thumbs-up blue " id=""></i> </span>
                            <span className="smalltext m-0 ">{item.createdAt}</span> 
                            <span href="" onClick={handleDelete} className="red float-right"><i className="fa fa-trash mid"> <span className=" smalltext">Delete</span> </i></span>
                        </div>
                        <div className=" ml-5  pl-3 pr-1 user_comment">
                            <span className="  smalltext hel ">  {item.comment} </span> <br/>
                        </div>
                       
                        
                        </div>
                </div>
            )
        })
        if(!props.course){
            return(
                <div className="">
                    No course id
                </div>
            )
        }
        return(
            <div  className=" mt-5 col-sm-12 col-md-6 col-lg-6">
                <hr />
                <hr />
                
                <p className="smalltext abel">Don't write comment while watching video. We will fix this problem soon .</p>
                <h5 className=" hel  bold">Comments Section </h5>
                <hr className="light" />
                <CommentForm  author={props.author} add_comments={props.add_comments} course={props.course._id} />
                <br />
                {commentarr}
                <br />
            </div>
        )
    }
    else{
        return(
            <div className="">khali comment</div>
        )
    }
}

class CommentForm extends Component{
    constructor(props){
        super()
        this.state={
            author:props.author,
        }
    }

    handleClick=(values)=>{
        console.log((values.comment))
        this.props.add_comments(this.props.course,values.rate,values.comment,this.state.author);
    }
    render(){
        return(
            <div className="comment-form">
                <LocalForm onSubmit={(values)=> {this.handleClick(values) }} className="d-flex flex-wrap form m-1">
                    <div className="form-group col-sm-12 col-md-9">
                    <label htmlFor="rate" className="bold">Add comment:</label>
                        <Control.textarea className="form-control" type="textarea" rows={3} placeholder="Add new Comments here (required)" model=".comment"  required />
                    </div>
                    <div className="form-group col-sm-6 col-md-3">
                        <label htmlFor="rate" className="bold">Rating:</label>
                        <Control.text className="form-control"  type="number"  placeholder="1 to 5(required)" model=".rate"   required />  
                        <Button type="submit" className="m-1 pl-4 pr-5 btn btn-success">  Submit</Button>
                  
                    </div>
                </LocalForm>
{/* 
                <LocalForm onSubmit={(values) => this.handleClick(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".Rate" name="Rate" id="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        Submit
                    </Button>
                </LocalForm> */}

            </div>
        )
    }
} 
export default CourseDetail;