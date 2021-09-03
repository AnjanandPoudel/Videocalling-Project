import * as ActionType from './ActionTypes';


export const Users=(state={
   users:[],
   failed_user:null,
   loading_user:false
} , action)=>{
    switch(action.type){
       case ActionType.LOADING_USERS:
           return {...state,loading_user:true,failed_user:null,users:[]}
       case ActionType.FAILED_LOGIN:
           return {...state,loading_user:false,failed_user:action.payload,users:[]}
       case ActionType.SHOW_USERS:
           return {...state,loading_user:false,failed_user:null,users:action.payload};
        default:
            return state
    }
}

