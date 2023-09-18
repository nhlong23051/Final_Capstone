import * as types from './const'
import React from 'react'

const initialState = {
    loading: false,
    data: null,
    error: null,
    users: null,
    projects: null,
    openCrateTask: false,
    formCreateTask: null
}

export const modalCreateTaskReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case types.GET_USER_IN_PROJECT:
            state.users = action.payload
            return { ...state }

        case types.GET_ALL_PROJECTS:
            state.projects = action.payload
            return { ...state }

        case types.CREATE_TASK_REQUEST:
            state.loading = true
            state.data = null
            state.error = null
            return { ...state }

        case types.CREATE_TASK_SUCCESS:
            state.loading = false
            state.data = action.payload
            state.error = null
            return { ...state }

        case types.OPEN_DRAWER_CREATE_TASK:
            state.openCrateTask = true
            state.formCreateTask = action.payload

            return { ...state }

        case types.CLOSE_DRAWER_CREATE_TASK:
            state.openCrateTask = false
            return { ...state }

        default:
            return { ...state }
    }
}
