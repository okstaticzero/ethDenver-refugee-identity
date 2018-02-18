import * as types from "../store/actionTypes";
import { push } from "react-router-redux";
import Refugees from '../services/RefugeeService';

// =================== Redirect User to Search as Type ========================
export function redirectUserToSearch() {
    return async dispatch => {
        dispatch(push("/search"));
    };
}

// ================== GET ALL DATA =======================================
export function getAllRefugees() {
    return async dispatch => {
        try {
            let data = await Refugees.getAll();
            dispatch(getAllRefugeesSucess(data));
        } catch(err) {
            console.log(err);
        }
    };
}

export function getAllRefugeesSucess(data) {
    return {
        type: types.ALL_REFUGEE,
        payload: data
    }
}

export function newSearchParams(params) {
    return {
        type: types.SEARCH_PARAMS,
        payload: params
    }
}