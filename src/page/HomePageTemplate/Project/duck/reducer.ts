import * as types from './const'
import { ActType, DataType, InitialState } from './types'

const initialState: InitialState<DataType> = {
    loading: false,
    data: null,
    error: null,
    keyWord: ''
}

export const getAllProductReducer = (state = initialState, action: ActType) => {
    switch (action.type) {

        case types.GET_PROJECT_ALL_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }


        case types.GET_PROJECT_ALL_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null

            return { ...state }

        case types.GET_PROJECT_ALL_FAIL:
            state.loading = false
            state.data = null
            state.error = action.payload
            return { ...state }

        case types.SEARCH_PROJECT:
            state.keyWord = action.payload
            return { ...state }


        default:
            return { ...state }
    }
}
