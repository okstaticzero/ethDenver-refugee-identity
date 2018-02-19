import * as types from "../store/actionTypes";
import Refugee from "../services/RefugeeService";
import { setJSON } from "../util/IPFS";
import { showPreloader } from "../app/AppActions";
import { attestRefugee } from "../util/Uport";
import { push } from "react-router-redux";

export const usersSuccess = data => {
  return {
    type: types.USERS_SUCCESS,
    payload: data
  };
};

export const getAllUsers = () => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const users = await Refugee.getAllUsers();
      dispatch(usersSuccess(users));
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const accountSuccess = account => {
  return {
    type: types.ACCOUNT_SUCCESS,
    payload: account
  };
};

export const addPerson = refObj => {
  return async (dispatch, getState) => {
    dispatch(showPreloader(true));
    try {
      const account = getState().accounts.account;
      const ipfsHash = await setJSON(refObj);
      const hash1 = ipfsHash.substr(0, 32);
      const hash2 = ipfsHash.substr(32);
      
      const refugee = await Refugee.addPerson(
        account,
        refObj.name,
        refObj.origin,
        refObj.organization,
        hash1,
        hash2
      );
      console.log("refugee: ", refugee);
      dispatch(showPreloader(false));
      dispatch(getAllUsers());
      dispatch(push("/search"));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export function transferIdentity(adminAddress, refugeeAddress, id) {
  console.log("******", adminAddress, refugeeAddress, id);
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      let transfer = await Refugee.transferIdentityOwnership(
        adminAddress,
        refugeeAddress,
        id
      );
      dispatch(showPreloader(false));
      dispatch(transferIdentitySuccess(transfer));
      //attest
      attestRefugee();
    } catch (err) {
      dispatch(showPreloader(false));
      console.log("ERROR:", err);
    }
  };
}

export function transferIdentitySuccess(payload) {
  console.log("SUCCESS!!:", payload);
  return {
    type: types.TRANSFER_SUCCESS,
    payload: true
  };
}

export function closePopup() {
  return {
    type: types.CLOSE_POPUP,
    payload: false
  };
}
