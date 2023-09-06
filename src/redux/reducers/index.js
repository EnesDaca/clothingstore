import { combineReducers } from "redux";
import { topMenu } from "./topMenu";
import { product } from "./product";
import * as cart from "./cart";

const rootReducer = combineReducers({
  topMenu,
  product,
  ...cart,
});

export default rootReducer;
