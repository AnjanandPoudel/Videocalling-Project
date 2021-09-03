
import * as ActionType from './ActionTypes';
/* 
You can also write state={red_comments:COMMENTS} but you will have to write only this in createStore ;
    combineReducers{ 
        Courses // exported from the Reducers
    }
 */
export const Courses=(state={
    isLoading:true,
    errmsg:null,
    courses:[]
},action)=>{
    switch(action.type){
        case ActionType.SHOW_COURSES:
            return{...state,isLoading:false,errmsg:null,courses:action.payload}
        case ActionType.LOADING_COURSES:
            return{...state,isLoading:true,errmsg:null,courses:[]}
        case ActionType.FAILED_COURSES:
            return{...state,isLoading:false,errmsg:action.payload,courses:[]}
        case ActionType.ADD_COURSES:
            let course=action.payload;
            return {...state,courses:state.courses.concat(course)}
        default:
        return state;
    }
}