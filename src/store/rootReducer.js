import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import accountsReducer from "../accounts/AccountsReducer";
import AppReducer from "../app/AppReducer";
import * as types from "./actionTypes";

const loadingState = (state = { loading: false }, action) => {
  switch (action.type) {
    case types.SHOW_PRELOADER:
      return { ...state, loading: action.payload };
    
    default:
      return state
  }
}

const root = combineReducers({
  router: routerReducer,
  accounts: accountsReducer,
  app: AppReducer,
  loadingState
});

export default root;
