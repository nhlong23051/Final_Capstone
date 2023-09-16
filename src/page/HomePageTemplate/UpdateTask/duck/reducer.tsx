import * as types from './const'

const initialState = {
    isOpen: false,
    data: null,
}

export const updateTaskReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case types.OPEN_FORM_UPDATE_TASK:
            state.isOpen = true
            return { ...state }

        case types.CLOSE_FORM_UPDATE_TASK:
            state.isOpen = false
            return { ...state }

        case types.GET_TASK_DETAIL:
            state.data = action.payload
            return { ...state }

        default:
            return { ...state }
    }
}
