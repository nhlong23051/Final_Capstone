import { setArgs } from '@craco/craco/dist/lib/args'
import * as types from './const'
import React from 'react'

const initialState = {
    infoProject: {},
    loading: false,
}

export const editProjectReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case types.GET_DETAIL_PROJECT:
            state.loading = false
            state.infoProject = action.payload
            console.log('state', state.infoProject);

            return { ...state }

        case types.GET_DETAIL_PROJECT_REQUEST:
            state.loading = true
            // state.infoProject = null
            return { ...state }

        default:
            return { ...state }
    }
}
