import * as types from "../store/actionTypes";

const initialState = { 
        allRefugees: [],
        searchParams: '',
        userProfile: {}
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ALL_REFUGEE:
            return { ...state, allRefugees: action.payload };
        
        case types.GET_PROFILE: 
            return { ...state, userProfile: action.payload }
        
        case types.SEARCH_PARAMS:
            return { ...state, searchParams: action.payload }

        default:
            return state;
    }
};
