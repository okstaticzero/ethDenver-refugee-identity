import * as types from "../store/actionTypes";

const initialState = { userList: [], currentUser: "", account: "0x2988374ecacbf4ccb2a1860959059289cfb8cd05" }

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
