import * as types from "../store/actionTypes";

const initialState = { todoList: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TODOS_SUCCESS:
      return { ...state, todoList: action.payload };

    default:
      return state;
  }
};
