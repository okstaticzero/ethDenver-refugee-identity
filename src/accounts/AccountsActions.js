import * as types from '../store/actionTypes';
import Todos from '../services/TodosService';
import { push } from "react-router-redux";

export const usersSuccess = data => {
  return {
    type: types.USERS_SUCCESS,
    payload: data,
  };
};

export const showPreloader = (bool) => {
  return {
    type: types.SHOW_PRELOADER,
    payload: bool
  };
};

export const getAllUsers = () => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      const users = await Todos.getAllUsers();
      dispatch(usersSuccess(users));
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};

export const accountSuccess = (account) => {
  return {
    type: types.ACCOUNT_SUCCESS,
    payload: account
  };
};

export const createAccount = (specificNetworkAddress, identity, isUport) => {
  return async dispatch => {
    dispatch(showPreloader(true));
    try {
      dispatch(accountSuccess({ specificNetworkAddress, identity }));
      console.log('1111111: ', specificNetworkAddress);

      const account = await Todos.createAccount(specificNetworkAddress);
      console.log('specificNetworkAddress: ', specificNetworkAddress);
      console.log('account: ', account);
      if (isUport) {
        dispatch(push(`/todos/${account}`));
      } else {
        dispatch(push(`/todos/${specificNetworkAddress}`));
      }
      dispatch(showPreloader(false));
    } catch (error) {
      dispatch(showPreloader(false));
    }
  };
};