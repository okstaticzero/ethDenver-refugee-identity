import * as types from "../store/actionTypes";
import { push } from "react-router-redux";
import Refugees from "../services/RefugeeService";

// =================== Redirect User to Search as Type ========================
export const showPreloader = bool => {
  return {
    type: types.SHOW_PRELOADER,
    payload: bool
  };
};

export function redirectUserToSearch() {
  return async dispatch => {
    dispatch(push("/search"));
  };
}

export function getAllRefugees() {
  return async dispatch => {
    console.log("GET ALL DATA");
    let data = await Refugees.getAll();
    dispatch(getAllRefugeesSucess(data));
  };
}

export function getAllRefugeesSucess(data) {
  return {
    type: types.ALL_REFUGEE,
    payload: data
  };
}

export function newSearchParams(params) {
  return {
    type: types.SEARCH_PARAMS,
    payload: params
  };
}
