import * as types from './const'

const initialState = {
    loading: false,
    data: null,
    error: null,
    user: [],
    keyWord: '',
    status: [],
    userByProject: [],
}

export const detailProjectReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case types.GET_PROJECT_DETAIL_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }


        case types.GET_PROJECT_DETAIL_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null

            return { ...state }

        case types.GET_PROJECT_DETAIL_FAIL:
            state.loading = false
            state.data = null
            state.error = action.payload
            return { ...state }

        case types.GET_ALL_USER:
            state.user = action.payload

            return { ...state }

        case types.GET_USER_BY_PROJECT:
            state.userByProject = action.payload

            return { ...state }

        case types.SEARCH_USER_NAME:
            state.keyWord = action.payload
            return { ...state }

        case types.GET_ALL_STATUS:
            state.status = action.payload

            return { ...state }

        default:
            return { ...state }
    }
}
