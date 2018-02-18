import * as types from "../store/actionTypes";
import Refugees from '../services/RefugeeService';

export function profileView(data) {
  return async dispatch => {
    try {
      let request = await Refugees.getOnePersonById(Number(data.id));
      dispatch(profileViewSuccess(request));
    } catch (err) {
      console.log(err);
    }
  };
}

export function profileViewSuccess(payload) {
  return {
    type: types.GET_PROFILE,
    payload: payload
  }
}