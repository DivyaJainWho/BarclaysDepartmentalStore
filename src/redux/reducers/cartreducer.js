import { ActionTypes as Type } from "../userConstants" 

const initialState={
    cartProducts:[]
}

const cartReducer =(state=initialState, action)=>{
    switch(action.type){
        case Type.ADD_TO_CART:
            return {cartProducts: action.payload}
        case Type.REMOVE_FROM_CART:
            return {cartProducts: action.payload}
        default:
            return state;
    }
}

export default cartReducer;