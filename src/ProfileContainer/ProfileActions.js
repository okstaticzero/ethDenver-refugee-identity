import * as types from "../store/actionTypes";
import Refugees from '../services/RefugeeService';

export function profileView(id) {
  return async dispatch => {
    console.log("GET BY ID", id);
    let data = await Refugees.getOnePersonById(Number(id));
    dispatch(profileViewSuccess(data));
  };
}

export function profileViewSuccess(payload) {
  return {
    type: types.GET_PROFILE,
    payload: payload
  }
}
