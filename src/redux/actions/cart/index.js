import * as actionTypes from "./types";

export const addCartItem = (data) => async (dispatch) => {
  dispatch(_addCartItem(data));
};

export const _addCartItem = (data) => {
  return {
    type: actionTypes.ADD_CART_ITEM,
    data,
  };
};
