import React, { createContext, useEffect, useRef, useState } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import { baseurl } from '../redux/baseURL';


const SocketContext=createContext();

/* const socket=io('http://localhost:5002/',{
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});
 */



/* 
                autoGainControl: false,
                channelCount: 2,
                echoCancellation: false,
                latency: 200,
                noiseSuppression: false,
                sampleRate: 48000,
                sampleSize: 16,
                volume: 1.0,
                googechoCancellation:false */



/*   mandatory:{
            googEchoCancellation: false,
            googAutoGainControl: false,
            googNoiseSuppression: false,
            googHighpassFilter: false,
            googTypingNoiseDetection: false,
            googNoiseReduction: false,
            },
            optional:[]
             */
const url='https://appvideobackend.herokuapp.com';
const url2=`http://localhost:8000`
const url3=window.location.host

const socket=io(baseurl)
console.log(url)

const ContextProvider=({children})=>{
    const [stream,setStream]=useState(null);
    const [me,setMe]=useState('');
    const [call,setCall]=useState({});
    const [callAccepted,setCallAccepted]=useState(false );
    const [callEnded,setCallEnded]=useState(false);
    const [name,setName]=useState('');

    

    const myVideo=useRef();
    const userVideo=useRef();
    const connectionRef=useRef();

    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    useEffect(()=>{//to use client microphone and camera
        navigator.mediaDevices.getUserMedia({video:true,
            audio: {

                mandatory:{
                    googEchoCancellation: false,
                    googAutoGainControl: false,
                    googNoiseSuppression: false,
                    googHighpassFilter: false,
                    },
                    optional:[
                        
                    ]
              }
        
        })
        .then((curr_Stream)=>{
            setStream(curr_Stream);
            console.log(myVideo)
            if( myVideo.current){
                myVideo.current.srcObject=curr_Stream;}
            
        })
        .catch(err=>{
            document.getElementById('root').innerHTML="NOt supported on this browser, try stopping other browser using camera and microphone"
        })

        socket.on('me',(id)=>setMe(id))
        socket.on('calluser',({from,name:callerName,signal})=>{
            console.log({isReceivedCall:true,from,name:callerName,signal})

            setCall({isReceivedCall:true,from,name:callerName,signal})
        })
    },[]) 
// empty dependency array to avoid running all time(sth like that)

/* 
let answer =  peer.conn.createAnswer(offerOptions);
answer.sdp = answer.sdp.replace('useinbandfec=1', 'useinbandfec=1; stereo=1; maxaveragebitrate=510000');
 peer.conn.setLocalDescription(answer);

 */
    

    const callUser=(id)=>{
        console.log(id)
        const peer=new Peer({initiator:true,trickle:false,stream:stream})
        console.log(peer)
        peer.on('signal',(data)=>{
            console.log({userToCall:id,signalData:data,from:me,name})
            
            socket.emit('calluser',{userToCall:id,signalData:data,from:me,name});

        }) 

        peer.on("stream", (curr_Streams)=>{
            console.log(userVideo.current)
                if( userVideo.current){
                    userVideo.current.srcObject=curr_Streams;
                }
        })
        console.log(userVideo.current)


        socket.on('callaccepted',(signal)=>{
            setCallAccepted(true);
            peer.signal(signal)
        })

        connectionRef.current=peer;

    }

  


    const answerCall=()=>{
        setCallAccepted(true)
        const peer=new Peer({initiator:false,trickle:false,stream:stream})
        
        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.from});

        })
        peer.on('stream',(curr_Streams)=>{
            userVideo.current.srcObject=curr_Streams;

        })


        peer.signal(call.signal);
        connectionRef.current =peer
    
    }


    const leaveCall=()=>{
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload()

    }

    return(
        <SocketContext.Provider value={{
            call,callAccepted,
            callEnded,myVideo,userVideo,
            stream,name,setName,callUser,
            leaveCall,answerCall,me
        }} >
            {children }
        </SocketContext.Provider>
    )
}

export {ContextProvider,SocketContext};