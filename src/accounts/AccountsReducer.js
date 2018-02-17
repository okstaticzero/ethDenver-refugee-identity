import * as types from "../store/actionTypes";

const initialState = { userList: [], currentUser: "", account: "" }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USERS_SUCCESS:
      return { ...state, userList: action.payload };
    case types.ACCOUNT_SUCCESS:
      return { ...state, currentUser: action.payload.identity, account: action.payload.specificNetworkAddress };

    default:
      return state;
  }
};
