import { combineReducers } from "redux";
import { registerReducer} from "./userReducer";
import { loginReducer } from "./loginReducer";
import cartReducer from "./cartreducer";

const reducers =combineReducers({
    Users: registerReducer,
    User: loginReducer,
    CartProducts: cartReducer
})

export default reducers;