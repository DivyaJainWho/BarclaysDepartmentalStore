import { ActionTypes as Type } from "../userConstants";

export const RegisterUser =(user={})=>(dispatch, getState) =>{
    const { Users:{users}} = getState();

    const hasUser = users.find((i) => i.emailId === user.emailId)

    if(!hasUser)
    {
        dispatch({
            type: Type.REGISTER_USER,
            payload: [...users, user]
        })
    }
}

export const LoginUser =(user={})=>(dispatch, getState) =>{
    const { Users:{users}} = getState();

    const hasUser = users.find((i) => i.emailId === user.emailId)

    if(hasUser)
    {
        dispatch({
            type: Type.LOGIN_USER,
            payload: user
        })
    }
}