import * as types from './const'
import { ActEditUser, InitialState, User } from './types'

const initialState:InitialState<User> = {
    loading: true,
    data: null,
    error: null
}

export const editUserReducer = (state = initialState, action: ActEditUser) => {
    switch (action.type) {

        case types.EDDIT_USER_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }

        case types.EDDIT_USER_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null
            return { ...state }

        case types.EDDIT_USER_FAIL:
            state.loading = false
            state.data = null
            state.error = action.payload
            return { ...state }

        default:
            return { ...state }

    }
}
