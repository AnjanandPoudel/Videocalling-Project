import  React ,{useContext,useState,useStyles} from 'react';
import { Button } from 'reactstrap';

import {SocketContext} from './videobox' 

const Notification=({children})=>{

    const {answerCall,call,callAccepted}= useContext(SocketContext);
   

    return(
        <>
            {
                call.isReceivedCall && !callAccepted && (
                    <div className="answercall ">
                        <div className="answerspace">
                            <h4>{call.name} is calling: </h4>
                            <Button className="answerbtn" onClick={answerCall}>
                                Answer Call
                            </Button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Notification;