import * as types from "../store/actionTypes";

const initialState = { 
        allRefugees: [], 
        searchParams: '' 
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ALL_REFUGEE:
            return { ...state, allRefugee: action.payload };
        case types.SEARCH_PARAMS:
            return { ...state, searchParams: action.payload }

        default:
            return state;
    }
};
