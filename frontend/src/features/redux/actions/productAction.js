import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/productConstants";


export const listProducts = () => async (dispatch) => {
  try {

    dispatch({ type: actionType.PRODUCT_LIST_REQUEST, });

    //fetch the products from rest api
    const { data } = await axios.get( `${BASE_URL}/api/accounts/products/` ); 

    dispatch({ 
      type: actionType.PRODUCT_LIST_SUCCESS, 
      payload: data 
    });


  } catch (error) {

    dispatch({
      type: actionType.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });


  };
};

export const listProductDetails = (id) => async (dispatch) => {
  try {

    dispatch({ type: actionType.PRODUCT_DETAILS_REQUEST, });

    //fetch the products from rest api
    const { data } = await axios.get( `${BASE_URL}/api/accounts/product/${id}` ); 

    dispatch({
      type: actionType.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });


  } catch (error) {

    dispatch({
      type: actionType.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });


  };
};
