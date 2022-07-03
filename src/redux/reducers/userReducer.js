import { ActionTypes as Type } from "../userConstants" 

const initialState ={
    users:[]
}

export const registerReducer = (state= initialState, action)=>{
    switch(action.type){
        case Type.REGISTER_USER:
            return {users: action.payload}
        default:
            return state;
    }
}