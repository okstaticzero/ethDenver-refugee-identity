import * as types from "../store/actionTypes";

const initialState = { 
    allRefugees: [{
        id: 1,
        name: "bud aminof",
        origin: "israel"
    },
    {
        name: "kiersten cohen",
        id: 2,
        origin: "colorado boulder"
    },
    {
        name: "matt wallce",
        id: 3,
        origin: "aman joran"
    },
    {
        name: "neeraj engineer",
        id: 4,
        origin: "india puna"
    },
    {
        name: "nahar anin",
        id: 5,
        origin: "slovania city"
    }

    ],
        searchParams: '',
        userProfile: {}
    }

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ALL_REFUGEE:
            return { ...state, allRefugee: action.payload };
        
        case types.GET_PROFILE: 
            return { ...state, userProfile: action.paylaod }
        
        case types.SEARCH_PARAMS:
            return { ...state, searchParams: action.payload }

        default:
            return state;
    }
};
