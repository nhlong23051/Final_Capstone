import * as types from './const'
import { FormRegister, StateRegister, TypeAct } from './types'

const initialState:StateRegister<FormRegister> = {
    loading: false,
    data: null,
    error: null
}

export const registerReducer = (state = initialState, action: TypeAct) => {
    switch (action.type) {
        case types.REGISTER_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }

        case types.REGISTER_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null
            
            return { ...state }

        case types.REGISTER_FAIL:
            state.loading = false
            state.data = null
            state.error = action.payload
            
            return { ...state }

        default:
            return { ...state }

    }
}