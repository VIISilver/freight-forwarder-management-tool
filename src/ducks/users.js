import axios from 'axios';

//INITIAL STATE
const initialState = {
    user: {},
    airlines: [{}],
    airlineSingular: {},
    newAirline: {},
    wizard: {
        air_freight: 0,
        fuel_surcharge: 0,
        security_surcharge: 0,
        screening: 0,
        iata_airline_code: 0,
        airline_name: '',
        airline_type: ''
    },
    updateAirline: {
        air_freight: 0,
        fuel_surcharge: 0,
        security_surcharge: 0,
        screening: 0,
        iata_airline_code: 0,
        airline_name: '',
        airline_type: '',
        airline_id: 0
    }
};

//CONSTANTS THAT REPRESENT ACTIONS
const FULFILLED = '_FULFILLED';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_ALL_AIRLINES = 'GET_ALL_AIRLINES';
const GET_ONE_AIRLINE = 'GET_ONE_AIRLINE';
const UPDATE_WIZARD = "UPDATE_WIZARD";
const RESET_WIZARD = "RESET_WIZARD";
const CREATE_AIRLINE = "CREATE_AIRLINE";

//ACTION CREATORS
export function getUserInfo() {
    const userData = axios.get('/auth/me')
        .then(res => {
            return res.data
        })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getAllAirlines() {
    const allAirlines = axios.get('/api/airlines')
        .then(res => {
            return res.data
        })
    return {
        type: GET_ALL_AIRLINES,
        payload: allAirlines
    }
}

export function updateWizard(obj) {
    return {
        type: UPDATE_WIZARD,
        payload: obj
    };
}

export function resetWizard() {
    return {
        type: RESET_WIZARD,
        payload: null
    };
}

export function createAirline(obj) {
    console.log("Create Airline Fired")
    const promise = axios.post('/api/airlines', obj).then(response => {
        console.log(response);
        return response.data;
    });

    return {
        type: CREATE_AIRLINE,
        payload: promise
    };
}

export function getOneAirline(airlineId) {
    console.log('getOne fired');
    const oneAirline = axios.get('/api/airlines/' + airlineId)
        .then(res => {
            console.log(res);
            return res.data
        })
    return {
        type: GET_ONE_AIRLINE,
        payload: oneAirline
    }
}

//REDUCER FUNCTION
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO + FULFILLED:
            return Object.assign({}, state, { user: action.payload })

        case GET_ALL_AIRLINES + FULFILLED:
            return Object.assign({}, state, { airlines: action.payload });

        case GET_ONE_AIRLINE + FULFILLED:
            return Object.assign({}, state, { airlineSingular: action.payload });

        case UPDATE_WIZARD: {
            let newState = Object.assign({}, state);
            for (var i in action.payload) {
                newState.wizard[i] = action.payload[i];
            }
            return newState;
        }

        case RESET_WIZARD: {
            let newState = Object.assign({}, state);
            for (var j in newState.wizard) {
                newState.wizard[j] = null;
            }
            return newState;
        }

        case CREATE_AIRLINE + FULFILLED:
            return Object.assign({}, state, { newAirline: action.payload });

        default: return state;

    }

}