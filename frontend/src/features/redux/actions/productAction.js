import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,

} from '../constants/productConstants';
import axios from 'axios';

export const addProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_ADD_REQUEST,
        });

        const {data} = await axios.post('http://127.0.0.1:8000/api/accounts/product/create', product); 

        dispatch({
            type: PRODUCT_ADD_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        const {data} = await axios.get('http://127.0.0.1:8000/api/accounts/products/'); //fetch the products from rest api

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`http://127.0.0.1:8000/api/accounts/product/${id}`); //fetch the products from rest api

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

