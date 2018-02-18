import * as types from "../store/actionTypes";
import Refugee from "../services/RefugeeService";
import { setJSON } from "../util/IPFS";
import { showPreloader } from "../app/AppActions";

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
      console.log("hash1: ", hash1);
      console.log("hash2: ", hash2);
      console.log("account: ", account);
      //addPerson(userAddress, _fullName, _origin, _organization, _ipfs1, _ipfs2)
      const refugee = await Refugee.addPerson(
        account,
        refObj.name,
        refObj.origin,
        refObj.organization,
        hash1,
        hash2
      );

      console.log("refugee: ", refugee);
      console.log("XXXXXX: OK");

      //dispatch(push(`/addnew`));
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};
