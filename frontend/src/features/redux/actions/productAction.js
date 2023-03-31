import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CONTACT_ADD_REQUEST,
    CONTACT_ADD_SUCCESS,
    CONTACT_ADD_FAIL,
  } from "../constants/productConstants";
  import axios from "axios";
  
  export const AddContact = (contact) => async (dispatch, getState) => {
    try {
      dispatch({
        type:  CONTACT_ADD_REQUEST,
      });
  
      const {
        userState: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
  
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/accounts/contact/create",
          contact,
          config
      );
  
      dispatch({
        type:CONTACT_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listProducts = () => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });
  
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/accounts/products/"
      ); //fetch the products from rest api
  
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });
  
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/accounts/product/${id}`
      ); //fetch the products from rest api
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  