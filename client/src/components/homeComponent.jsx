/* 

 constructor(){
    super()
    this.state={
      selected:null
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }


  handleChange(event){
    this.setState({
      selected:event.target.files[0]
    })
    console.log(this.state.selected);
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(this.state.selected);
    console.log(this.state)

    const formdata=new FormData();
    formdata.append('inputfield',this.state)

  //   fetch('http://localhost:3001/courses',{
   // method:'POST',
  //  body:formdata
  //})
  
 

axios.post("api/uploadfile", formdata); 

  console.log(formdata)

  }

  
  render(){


    return (
      <div className="App">
        <Header />
        <form action="/courses" encType="multipart/form-data" onSubmit={this.handleSubmit} >

        <input type="file" name="videoname" onChange={this.handleChange} />
        <button  type="submit" >Submit</button>
        </form>
        
      </div>
    );
  } */

import { VideoPlayer } from "../composmall/mainvideo"
import { baseurl } from "../redux/baseURL"
import { Loading } from "./Loading"



/* 

  <div className="container-fluid pt-5 bg-course">
        <div className="m-3 moto">
            <h4>Lorem, ipsum dolor.</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto minus accusantia mollitia maxime quasi reprehenderit obcaecati eum.</p>
        </div>
        <div className="row">
            <div className="bg-course col-9 ">
                <div className="m-3 cards  d-flex flex-wrap">
                <% courses.forEach( courses=>{ %> 
                    <a href=/courses/<%= courses._id%> className="card m-1 cardCourse">
                        <video controls controlsList="nodownload" width="280px" height="280px" id="videoPlayer" src=videos/<%=courses.videoname%>> </video>
                        <div className="cardContents">
                            <i className="fa fa-like"></i>
                            <% for(let i=0; i < courses.stars; i++){%>
                                <i className="fa fa-star yellow"></i>
                            <% } %>
                        </div>
                        <div className="p-2">
                            <h6 className="m-0"><%= courses.videotitle %></h6>
                        <p className="smalltext"> <%= courses.descp %> </p>
                        </div>
                    </a>
                    <% }) %>
    
                </div>
            
            </div>
            <div className="sidebar p-3 col-3 ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur fugiat libero necessitatibus esse, optio porro velit dicta voluptas sed dolores!
            </div>
        </div>
    </div> */
function Home(props){
  console.log(props)
  return(
    <div className="">


<div className="container-fluid pt-0 bg-course">
    <div className="m-0 moto">
  
             </div>
    <div className="row">
        <div className="bg-course col-9 ">
          <h5 className="bold mt-0 m-2"> </h5>
          <hr className="light"/>
            <VideoPlayer auth={props.auth} userinformation={props.userinformation} />
        </div>
        <div className="sidebar p-3 col-3 ">
       
There was not a lot of pure frontend web developers at all . WebRTC generally does not work without some backend development . This could mean WebRTC is still to hard for most pure frontend developers.
<br />   
<br />
<span>STUN server is used to get an external network address and TURN servers are used to relay traffic if direct (peer-to-peer) connection fails. Every TURN server supports STUN. A TURN server is a STUN server with additional built-in relaying functionality.</span> 

  </div>
<p></p>
    </div>
</div> 
    </div>
)}


export default Home