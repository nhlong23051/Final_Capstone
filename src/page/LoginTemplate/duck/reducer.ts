import * as types from './const'
import { StateLogin, UserLogin, TypeAct } from './types'

const initialState: StateLogin<UserLogin> = {
    loading: false,
    data: null,
    error: null
}

export const loginReducer = (state = initialState, action: TypeAct) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            state.loading = true;
            state.data = null;
            state.error = null;

            return { ...state }

        case types.LOGIN_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }

        case types.LOGIN_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            
            return { ...state }

        case types.LOG_OUT:
            state.data = null
            state.error = null
            return { ...state }

        default:
            return { ...state }

    }
}