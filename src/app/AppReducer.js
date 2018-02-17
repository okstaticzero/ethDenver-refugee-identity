import * as types from "../store/actionTypes";

const initialState = { allRefugees: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ALL_REFUGEE:
            return { ...state, allRefugee: action.payload };

        default:
            return state;
    }
};
