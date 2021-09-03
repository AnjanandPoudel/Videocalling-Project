import * as ActionType from './ActionTypes';


/* 
You can also write state={red_comments:COMMENTS} but you will have to write only this in createStore ;
    combineReducers{ 
        Courses // exported from the Reducers
    }
 */
///Here i will receive an action and act on it (from i guess action creator) with the help of action types

export const Comments=(state={
    loading_comments:false,
    failed_comments:null,
    show_comments:[]
} , action)=>{
    switch(action.type){
       
        case ActionType.SHOW_COMMENTS:
            return {...state,loading_comments:false,failed_comments:null,show_comments:action.payload};
        case ActionType.LOADING_COMMENTS:
            return {...state,loading_comments:true,failed_comments:null,show_comments:[]};
        case ActionType.FAILED_COMMENTS:
            return {...state,loading_comments:false,failed_comments:action.payload,show_comments:[]}
        case ActionType.ADD_COMMENT:
            let comment=action.payload;
            return {...state,show_comments:state.show_comments.concat(comment)};
            // since i can't mutate the state directly so here i am using concat to create a new obj and return it
        default:
            return state
    }
}

