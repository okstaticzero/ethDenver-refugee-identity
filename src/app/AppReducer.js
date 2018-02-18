import * as types from "../store/actionTypes";

const initialState = { 
        allRefugees: [],
        searchParams: '',
        userProfile: {},
        successPopup: true,
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ALL_REFUGEE:
            return { ...state, allRefugees: action.payload };
        
        case types.GET_PROFILE: 
            return { ...state, userProfile: action.payload }
        
        case types.SEARCH_PARAMS:
            return { ...state, searchParams: action.payload }
        
        case types.TRANSFER_SUCCESS: 
            return { ...state, successPopup: action.payload}
        
        case types.CLOSE_POPUP:
            return { ...state, successPopup: action.payload }

        default:
            return state;
    }
};
