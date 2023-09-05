import * as types from './const'

const initialState = {
    loading: false,
    data: null,
    error: null,
    keyWord: ''
}

export const createProjectReducer = (state = initialState, action:any) => {
    switch (action.type) {

        case types.CREATE_PROJECT_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }


        case types.CREATE_PROJECT_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null

            return { ...state }

        case types.CREATE_PROJECT_FAIL:
            state.loading = false
            state.data = null
            state.error = action.payload
            return { ...state }


        default:
            return { ...state }
    }
}
