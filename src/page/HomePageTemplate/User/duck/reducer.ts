import * as types from './const'
import { ActType, DataType, InitialState } from './types'

const initialState:InitialState<DataType> = {
    loading: false,
    data: null,
    error: null,
    keyWord: ''
}

export const getAllUserReducer = (state = initialState, action: ActType) => {
    switch (action.type) {

        case types.GET_ALL_USER_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }


        case types.GET_ALL_USER_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null

            return { ...state }

        case types.GET_ALL_USER_FAIL:
            state.loading = false
            state.data = null
            state.error = action.payload
            return { ...state }

        case types.SEARCH_USER:
            state.keyWord = action.payload
            return { ...state }


        default:
            return { ...state }
    }
}
