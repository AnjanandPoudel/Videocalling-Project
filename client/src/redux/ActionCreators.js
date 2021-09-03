
import * as ActionType from './ActionTypes';
import { baseurl } from './baseURL';
import axios from 'axios';
import { Redirect } from 'react-router';

import { Loading } from '../components/Loading';

/* success handling */
export const successUpdate=(res)=>{
   alert("Successfully updated , press Enter/Ok")
}
/* error handling */
export const myerr=(err)=>{
    if(err.request.status===500){
        console.log(err.response)
        alert(err + " \n Try following things: \n -make sure you filled all/max fields if given  \n -Try posting data in correct format.(for eg; we only take videos in mp4/mkv/gif/m4v format and images in png/jpeg/jpg/gif \n-You/User may not be authorized to do this action or try signing in first ) ")
    }
    else if(err.response.data.err){
        console.log(err.response)
        alert(err.response.data.err + "\n Error "+err.request.status +" Message: "+err.request.statusText)
    }
    else if(err.response){
        console.log(err.response)
        alert(err.response.data + "\n Error "+err.request.status +" Message: "+err.request.statusText)
    }
}

export const add_comment=(comment )=>({
    type:ActionType.ADD_COMMENT,
    payload:comment
    // now send it to store via Comments_reducers
})

export const postComments=( c,r,comment,author )=>(dispatch)=>{
    dispatch(loading_comments)

    let ourdata={
        course:c,
        rating:r,
        comment:comment,
        author:author
    }
    console.log(ourdata)
    ourdata.date=new Date().toISOString();
    let bearer='bearer '+localStorage.getItem('token')
/*     return axios.post(baseurl+'courses',ourdata)
 */


    return axios({
        method: 'post',
        url:baseurl+ 'comments',
        data:ourdata,
        headers:{
            Authorization:bearer,
        }
      })
    .then(res=>res.data )//either you should use small brackets to directly return or if u want to use curly bracket then you must write ''
    .then(res=>{
        console.log(res)
        dispatch(add_comment(res))
        fetchcomments()
    })
    .catch(err=>{
        myerr(err)
    })
}



export const postCourses=(formData)=>(dispatch)=>{
  
    /*     return axios.post(baseurl+'courses',ourdata)
     */
    dispatch(loading_courses)
    console.log("courses loading")
    let bearer='bearer '+localStorage.getItem('token') 
    
    return axios({
        method: 'post',
        url:baseurl+ 'upload',
        data:formData,
        headers:{
            'Content-Type':'application/json',
            Authorization:bearer
        },
        credentials: 'same-origin'
      })
      .then(res=>res.data )//either you should use small brackets to directly return or if u want to use curly bracket then you must write ''
        .then(res=>dispatch(add_course(res)))
        .catch(error=>{myerr(error)
        }) 
    }
    
    export const add_course=(course)=>({
        type:ActionType.ADD_COURSES,
        payload:course
    })
    

/* 
.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        throw error;
  })
.then(response => response.json())
.then(response => dispatch(addComment(response)))
.catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message);});
};
 */

export const loginUser=(creds)=>(dispatch)=>{
    //dispatching this to kick off the call to api says guru
    dispatch(request_login(creds))
    return axios({
        method:'post',
        url:baseurl+'users/login',
        headers:{
            'Content-Type':'application/json'
        },
        data:JSON.stringify(creds)
    })
    .then(res=>res.data)
    .then(res=>{
        if(res.success){
            creds.password="notavailable"
            localStorage.setItem('token',res.token)
            localStorage.setItem('creds',JSON.stringify(creds))
            dispatch(success_login(res))
            window.location.reload()

        }
        else{
            console.log('Error ta xa res.success false/null')
            myerr("Error ta xa res.success false/null")
        }
    })
   
    .catch(err=> myerr(err)
    )
}

export const request_login=(creds)=>({
    type:ActionType.REQUEST_LOGIN,
    payload:creds
})
export const success_login=(creds)=>({
    type:ActionType.REQUEST_SUCCESS,
    token:creds.token
})
export const failed_login=(creds)=>({
    type:ActionType.FAILED_LOGIN,
    payload:creds
})

export const logoutUser=()=>(dispatch)=>{
    dispatch(request_logout())
    localStorage.removeItem('token')
    localStorage.removeItem('creds')
    window.location.reload()
    dispatch(logout_success())

}
export const request_logout=()=>({
    type:ActionType.FAILED_LOGIN,
    
})
export const logout_success=()=>({
    type:ActionType.FAILED_LOGIN,
    
})



export const fetchCourses=()=>(dispatch)=>{
    dispatch(loading_courses(true));
    return axios({
        method: 'get',
        url:baseurl+ 'courses',

      })
    .then(res=>res.data)
    .then(res=>(dispatch(show_courses(res))))
    .catch(err=>{dispatch(failed_courses(err.message))})
}
export const loading_courses=()=>({
    type:ActionType.LOADING_COURSES
})
export const failed_courses=(e)=>({
    type:ActionType.FAILED_COURSES,
    payload:e
})
export const show_courses=(c)=>({
    type:ActionType.SHOW_COURSES,
    payload:c
})


// comments
/* export const fetchcomments=()=>(dispatch)=>{
    dispatch(loading_comments(true));
    
    setTimeout(()=>{
        dispatch(show_comments(COMMENTS));
    },1000)
}
 */
export const fetchcomments=()=>(dispatch)=>{
    dispatch(loading_comments(true));
    return axios.get(baseurl+'comments')
    .then(res=>res.data)
    .then(res=> dispatch(show_comments(res)) )
    .catch(err=>{dispatch(failed_comments(err.message))})
}
export const loading_comments=()=>({
    type:ActionType.LOADING_COMMENTS,
})
export const failed_comments=(err)=>({
    type:ActionType.FAILED_COMMENTS,
    payload:err
})
export const show_comments=(courses)=>({
    type:ActionType.SHOW_COMMENTS,
    payload:courses
})



export const fetchUser=()=>(dispatch)=>{
    dispatch(loading_user(true));
    let bearer='bearer '+localStorage.getItem('token') 

    return axios({
        method: 'get',
        url:baseurl+ 'users',
        headers:{
            Authorization:bearer,
            'Content-Type':'application/json'
        }
      })
    .then(res=>res.data)
    .then(res=>{dispatch(show_users(res))
        console.log(res)
    })
    .catch(err=>{dispatch(failed_users(err.message))})
}
export const loading_user=()=>({
    type:ActionType.LOADING_USERS
})
export const failed_users=(e)=>({
    type:ActionType.FAILED_USERS,
    payload:e
})
export const show_users=(info)=>({
    type:ActionType.SHOW_USERS,
    payload:info
})



/////////////////////////////////// PUT /////////////////////////////////////////



export const putUserInfo =(data)=>(dispatch)=>{
    console.log(data)
    dispatch(loading_updated_user());
    let bearer='bearer '+localStorage.getItem('token') 

    let updateId=data._id
    delete data._id
    

    return axios({
        method:"put",
        url:baseurl+ 'users/'+updateId,
        data:data,
        headers:{
            Authorization:bearer,
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.data)
    .then(res=>console.log(res))
    .catch(err=>myerr(err))
}

export const loading_updated_user=()=>({
    type:ActionType.LOADING_UPDATED_USERS
})
export const failed_updated_user=(e)=>({
    type:ActionType.FAILED_UPDATED_USERS,
    payload:e
})
export const show_updated_user=(info)=>({
    type:ActionType.SHOW_UPDATED_USERS,
    payload:info
})



export const putCourses =(data,updateId)=>(dispatch)=>{

    console.log(data)
    console.log(updateId)
    dispatch(loading_updated_user());
    let bearer='bearer '+localStorage.getItem('token') 
 
    

    return axios({
        method:"put",
        url:baseurl+ 'courses/'+updateId,
        data:data,
        headers:{
            Authorization:bearer,
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.data)
    .then(res=>{
        successUpdate(res);
        console.log(res)
        window.location.reload()
    })
    .catch(err=>myerr(err))
}



export const putCourseThumbnail=(data,updateId)=>(dispatch)=>{
    /*     return axios.post(baseurl+'courses',ourdata) */
    let bearer='bearer '+localStorage.getItem('token') 
    dispatch(loading_courses)
    
    return axios({
        method: 'put',
        url:baseurl+ 'upload/'+updateId,
        data:data,
        headers:{
            'Content-Type':'application/json',
            Authorization:bearer
        },
        credentials: 'same-origin'
      })
      .then(res=>res.data )//either you should use small brackets to directly return or if u want to use curly bracket then you must write ''
        .then(res=>{
            dispatch(add_course(res))
/*             alert('Successfully updated')
 */            window.location.reload()
        })
        .catch(err=>{
          myerr(err)
           
        }) 
    }
    


    

    

export const deleteCourse=(id)=>(dispatch)=>{
    /*     return axios.post(baseurl+'courses',ourdata) */
    let bearer='bearer '+localStorage.getItem('token') 
    
    return axios({
        method: 'delete',
        url:baseurl+ 'courses/'+id,
        headers:{
            'Content-Type':'application/json',
            Authorization:bearer
        },
        credentials: 'same-origin'
      })
      .then(res=>res.data )//either you should use small brackets to directly return or if u want to use curly bracket then you must write ''
        .then(res=>{
            dispatch(add_course(res))
            alert('Successfully completed')
            window.location.reload()
           
        })
        .catch(err=>{
          myerr(err)
        }) 
    }
    


    
    

export const deleteComment=(id)=>(dispatch)=>{
    /*     return axios.post(baseurl+'courses',ourdata) */
    let bearer='bearer '+localStorage.getItem('token') 
    
    return axios({
        method: 'delete',
        url:baseurl+ 'comments/'+id,
        headers:{
            'Content-Type':'application/json',
            Authorization:bearer
        },
        credentials: 'same-origin'
      })
      .then(res=>res.data )//either you should use small brackets to directly return or if u want to use curly bracket then you must write ''
        .then(res=>{
            alert('Successfully completed')
            window.location.reload()
           
        })
        .catch(err=>{
          myerr(err)
        }) 
    }
    


    
