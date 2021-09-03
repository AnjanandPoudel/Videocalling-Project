import React,{Component} from 'react';
import Header from './headerComponent';
import Home from './homeComponent';
import Footer from './footerComponent';
import {Redirect,Route, Switch,withRouter} from 'react-router-dom';
import UserPage from './userpage';


import {VideoPlayer} from '../composmall/mainvideo'

import {connect} from 'react-redux';
import {postComments,postCourses,fetchCourses,fetchcomments,loginUser,logoutUser,fetchUser,putUserInfo,putCourses,putCourseThumbnail,deleteCourse,deleteComment } from '../redux/ActionCreators';



const mapStatetoProps= state=>{
  return{
    courses:state.red_courses,
    comments:state.red_comments,
    auth:state.auth,
    users:state.users
  }
}

const mapDispatchtoProps=(dispatchIt)=>({
  props_addComment:(courseId,rating,comment,author)=>{
    dispatchIt(postComments(courseId,rating,comment,author))
  },
  props_addCourses:(formData)=>{
    dispatchIt(postCourses(formData))
  },
  fetchCourses:()=>{dispatchIt(fetchCourses())},
  fetchcomments:()=>{dispatchIt(fetchcomments())},
  fetchUser:()=>{dispatchIt(fetchUser())},
  logoutUser:()=>{dispatchIt(logoutUser())},
  loginUser:(creds)=>{dispatchIt(loginUser(creds))},
  putUserInfo:(data)=>{dispatchIt(putUserInfo(data))},
  putCourses:(data,updateId)=>{dispatchIt(putCourses(data,updateId))},
  putCourseThumbnail:(data,updateId)=>{dispatchIt(putCourseThumbnail(data,updateId))},
  deleteCourse:(id)=>{dispatchIt(deleteCourse(id))},
  deleteComment:(id)=>{dispatchIt(deleteComment(id))},

})


class Main extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
      }
/*       
    onCourseClick(itemId){
      this.setState({selectedCourseId:itemId})
  }
 */
      componentDidMount(){
        this.props.fetchCourses()
        this.props.fetchcomments()
        this.props.fetchUser()
      }
    
      render() {
        console.log(this.props.courses)
        const HomePage=()=>{
          return(
          
            <div className="">
              
            {this.props.auth.is_auth?
              <Home image="/images/concert.jpg" 
              auth={this.props.auth} 
              likes={'liked videos'} 
              uservideos={''} 
              userinformation={this.props.users.users.filter(item=>item.username===this.props.auth.userinfo.username)[0]}
              putUserInfo={this.props.putUserInfo}   />
              :
              <Home image="/images/q.jpg"
               auth={this.props.auth}
                likes={'liked videos'}
                 uservideos={''}
                  userinformation={''}  />
          }
        </div>
          )
        }

     
       
    

        const UserkoPage=()=>{
          console.log(this.props)
          return(
            <div className="">
              
                {this.props.auth.is_auth?
                  <UserPage image="/images/concert.jpg" 
                  auth={this.props.auth} 
                  likes={'liked videos'} 
                  uservideos={''} 
                  userinformation={this.props.users.users.filter(item=>item.username===this.props.auth.userinfo.username)[0]}
                  putUserInfo={this.props.putUserInfo}   />
                  :
                  <UserPage image="/images/q.jpg"
                   auth={this.props.auth}
                    likes={'liked videos'}
                     uservideos={''}
                      userinformation={''}  />
              }
            </div>
          )
        }

        const Users=()=>{
          console.log(this.props)
          return(
            <div className="">
              <UserPage auth={this.props.auth} likes={'liked videos'} uservideos={''} userinformation={this.props.users}   />
            </div>
          )
        }
        


     

        return (
        
          <div className="">
           <Header  loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} auth={this.props.auth} 
            userinformation={this.props.users.users.filter(item=>item.username===this.props.auth.userinfo.username)[0]} />
          
            <Switch>
              <Route path="/home" component={HomePage} />
    
              <Route path="/user" component={UserkoPage} />
              <Route path="/users" component={Users} />
              <Redirect to="/home" />
            </Switch>

            <Footer />
          </div>
    
        );
      }
}

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(Main)) // connecting class Main and mapStatetoProps