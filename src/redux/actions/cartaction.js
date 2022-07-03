import { ActionTypes as Type} from "../userConstants";

export const addToCart =(cartProduct ={}) =>  (dispatch,getState) =>{
    const { CartProducts:{cartProducts}} = getState();

    
    const hascartProducts = cartProducts.find((i) => i.name === cartProduct.name)

    if(!hascartProducts || !Object.keys(cartProduct).length)
    {
        dispatch({
            type: Type.ADD_TO_CART,
            payload: [...cartProducts,cartProduct]
        })
    }
}


export const removeFromCart =(cartProduct) =>(dispatch, getState)=>{
  const { CartProducts: {cartProducts}} = getState();

  dispatch({
      type: Type.REMOVE_FROM_CART,
      payload: cartProducts.filter((t) => t.name !== cartProduct.name)
  })
}