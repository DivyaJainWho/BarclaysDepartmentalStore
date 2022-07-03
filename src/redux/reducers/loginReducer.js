import { ActionTypes as Type } from "../userConstants" 

const initialState ={
    user:{}
}

export const loginReducer = (state= initialState, action)=>{
    switch(action.type){
        case Type.LOGIN_USER:
            return {user: action.payload}
        default:
            return state;
    }
}