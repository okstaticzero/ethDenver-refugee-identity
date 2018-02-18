import * as types from "../store/actionTypes";
import Refugees from '../services/RefugeeService';
import axios from 'axios';

export function profileView(data) {
  return async dispatch => {
    try {
      let request = await Refugees.getOnePersonById(Number(data.id));
      dispatch(getIPFSdata(request));
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

export function getIPFSdata(payload) {
  return async dispatch => {
    try {
      let request = await axios.get(`https://ipfs.infura.io/ipfs/${payload.ipfs}`);
      dispatch(profileViewSuccess(request.data));
    } catch (err) {
      console.log(err);
    }
  };
}