import  React ,{useContext,useState,useStyles} from 'react';
import { Button } from 'reactstrap';

import {SocketContext} from './videobox' 

const Options=(props,{children})=>{

    const {me,callAccepted,name,setName, callEnded,leaveCall,callUser}= useContext(SocketContext);
    const [idToCall, setIdToCall]=useState(``);
    const classes=useStyles;

    if(props.auth.userinfo){
        setName(props.auth.userinfo.username)
    }

    return(
        <div className="container">
           <div className="  text-center">
            <form className=" d-flex wrap justify-content-around form">
                <div className=" form-group ">
                    <input className="form-control" id="name"  type="text" placeholder="Type your name" value={name} onChange={(e)=> setName(e.target.value)}  />
                    <p>YOUR ID IS:</p>
                    <p>  {me}  </p> 
                </div>
                
                {props.auth.userinfo && (
                                   <div className="  form-group ">
                                   <h6> MaKe a call:</h6>
                                   <input className="form-control" id="Id to call" value={idToCall}  type="text" placeholder="TYPE THE ID TO BE CALLED" onChange={(e)=> setIdToCall(e.target.value)}   />
                                   <br />
                                   { callAccepted && !callEnded ?
                                   (
                                       <Button varient="contained" color="secondary"
                                        fullWidth
                                        onClick={leaveCall}
                                       >
                                           Hang up
                                       </Button>
                                   )
                                   :
                                   <Button   varient="contained" color="primary"
                                   fullWidth
                                   onClick={ ()=>callUser(idToCall) }
                                  >
                                      Call now
                                  </Button>
                                   
                                   }
               
                               </div>
               
                    
                )}

                {!props.auth.userinfo && (
                                <div className="  form-group ">
                                    <p className="bold"> Log in to Make a Call </p>
                               </div>
               
                    
                )}


                </form>

            </div>
            {children}

        </div>
    )
}

export default Options;