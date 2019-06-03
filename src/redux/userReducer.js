//getting user information and storing it on redux.
//gigs should also include tasks.

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    street: "",
    city: "",
    zip: "",
    _state: "",
    gigs: []
}

export const USER_INFO = "USER_INFO"

export function userInfo(obj){
    return {
        type: USER_INFO,
        payload: obj
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case USER_INFO:
            return {
                ...state,
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phoneNumber: payload.phoneNumber,
                jobTitle: payload.jobTitle,
                street: payload.street,
                city: payload.street,
                zip: payload.zip,
                _state: payload._state,
                gigs: payload.gigs
            }
        default: 
            return state
    }
}