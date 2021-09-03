import React from 'react';
import FacebookLogin from 'react-facebook-login'
import axios from 'axios';
import { baseurl } from '../redux/baseURL';


function Oauth(){

    const responseFacebook =(response)=>{
      console.log(response)
      axios({
        method:'GET',
        url:baseurl+'users/facebook/token',
        headers:{
          Authorization:'Bearer '+response.accessToken,
      },
      credentials: 'same-origin'
      })
      .then(response=>{
        return response.data
      })
      .then(res=>{
        console.log(res)
        if(res.success){
            localStorage.setItem('token',res.token)
            localStorage.setItem('creds',JSON.stringify(res.user))
            window.location.reload()

        }
        else{
            console.log('Error ta xa')
        }
      })
      .catch(err=>{
        console.log(err+"Ok error")
      })
    }

    const componentClicked=()=>{
    }

    return(
        <div className="oauth">
          <FacebookLogin
            appId="493613475001569"
            autoLoad={false}
            callback={responseFacebook}
            onClick={componentClicked}
          />
        </div>
    )
}


export default Oauth;