/* import {Reducer,initialState} from './reducers'
import { Courses } from "./course_reducer";
import {createStore} from 'redux'
import { COURSES } from '../shared/courses';
import { Comments } from './comment_reducer';

export const configStore=()=>{
    const store= createStore(
        Courses
         

    )

    return store

} */

import {applyMiddleware, combineReducers, createStore} from 'redux'
import { Comments } from "./comment_reducer";
import { Courses } from "./course_reducer";

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { Auth } from './auth';
import { Users } from './users_reducer';


export const configStore=()=>{
    const store= createStore(
        combineReducers({
           red_comments: Comments,
           red_courses:Courses,
           auth:Auth,
           users:Users
        }),
        applyMiddleware(thunk , logger) // thunk is that functionality that return a function
    );

    return store

}