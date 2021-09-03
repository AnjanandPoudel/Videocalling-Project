import * as ActionType from './ActionTypes';


export const Auth=(state={
    loading_auth:false,
    err_auth:null,
    is_auth:localStorage.getItem('token') ? true:false,
    token:localStorage.getItem('token'),
    userinfo:JSON.parse(localStorage.getItem('creds') ?localStorage.getItem('creds'):null)
} , action)=>{
    switch(action.type){
       
        case ActionType.REQUEST_LOGIN:
            return {...state,loading_auth:true,failed_auth:null,userinfo:action.payload,is_auth:false};

            //login success
        case ActionType.REQUEST_SUCCESS:
            return {...state,loading_auth:false,failed_auth:null,is_auth:true,token:action.token};
            
        case ActionType.FAILED_LOGIN:
            return {...state,loading_auth:false,failed_auth:action.payload,is_auth:false};
            
        case ActionType.REQUEST_LOGOUT:
            return {...state,loading_auth:true,failed_auth:null};
            
        case ActionType.LOGOUT_SUCCESS:
            return {...state,loading_auth:false,failed_auth:null,userinfo:null,is_auth:false,token:''};
            
  /*      
        case ActionType.ADD_COMMENT:
            let comment=action.payload;
            return {...state,show_comments:state.show_comments.concat(comment)}; */
        default:
            return state
    }
}

