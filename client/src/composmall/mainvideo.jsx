import React, { useContext } from 'react';
import Notification from './Notification';
import Options from './optionsComp';
import { SocketContext } from './videobox';




export const VideoPlayer=(props)=>{
   console.log(props)
    return(
       <div className="">
           <VideoBox auth={props.auth} />
           <Options  auth={props.auth} />
           <Notification />
       </div>
    )
}


function VideoBox(props){
    const {name,callAccepted,myVideo,userVideo,callEnded,
        stream,call}=useContext(SocketContext)
    return(
        <div className=" ">
              <p className="smalltext hel"> *If you don't see your video make sure you have granted access to camera to this website. You can view this
                 info in setting or in the information tab (i) above in the address bar.
                </p>
            <div className="d-flex justify-content-center flex-wrap">
              
                <br />
                {
                    stream && (
                        <div className="align-left">
                            
                                <video   playsInline ref={myVideo} autoPlay className="videocalling vid1 " />
                                <br />
                                {props.auth.userinfo && (
                                    <div className=" video_name mr-5 ml-5">
                                        <span className="ml-5 bold"  > Name: {name|| props.auth.userinfo.username } </span>
                                    </div>
                                ) }
                                <br />
                        </div>
                    )
                
                }

                {
                    callAccepted && !callEnded && (
                    <div className="">
                            <video  playsInline ref={userVideo} autoPlay className="videocalling vid2 " />
                            <br />
                            <div className=" video_name ">
                                <span className=" ml-5 bold" >Hello my name is : {call.name||"name"}</span>
                            </div>

                    </div>
        
                    )
                }

            

        
            </div>
        </div>
    )
}