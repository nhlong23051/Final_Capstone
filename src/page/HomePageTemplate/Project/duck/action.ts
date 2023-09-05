import api from '../../../../Util/apiUtil'
import * as types from './const'
import { ActType, DataType } from './types'

const actAllProjectSuccess = (data: DataType): ActType => {
    return {
        type: types.GET_PROJECT_ALL_SUCCESS,
        payload: data
    }
}

const actAllProjectFail = (error: any): ActType => {
    return {
        type: types.GET_PROJECT_ALL_FAIL,
        payload: error
    }
}

const actAllProjectRequest = (): ActType => {
    return {
        type: types.GET_PROJECT_ALL_REQUEST
    }
}

export const actFetchListAllProject = () => {
    return (dispatch: any) => {
        dispatch(actAllProjectRequest())
        api.get('Project/getAllProject')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actAllProjectSuccess(result.data.content))
                }
            })
            .catch((error) => {
                dispatch(actAllProjectFail(error))
            })
    }
}

export const actSearchProject = (keyword: string): ActType => {
    return {
        type: types.SEARCH_PROJECT,
        payload: keyword
    }
}