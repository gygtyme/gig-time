//getting user information and storing it on redux.
//gigs should also include tasks.

const initialState = {
    user_id: "",
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
export const LOGOUT = "LOGOUT"
export const LOGIN = 'LOGIN'

export function userInfo(obj) {
    return {
        type: USER_INFO,
        payload: obj
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_INFO:
            return {
                ...state,
                user_id: payload.id,
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
        case LOGOUT:
            return initialState



        default:
            return state
    }
}