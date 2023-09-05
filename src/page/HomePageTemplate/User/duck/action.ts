import api from '../../../../Util/apiUtil'
import * as types from './const'
import { ActType, DataType } from './types'

const actGetAllUserSuccess = (data: DataType): ActType => {
    return {
        type: types.GET_ALL_USER_SUCCESS,
        payload: data
    }
}

const actAllUserFail = (error: any): ActType => {
    return {
        type: types.GET_ALL_USER_FAIL,
        payload: error
    }
}

const actGetAllUserRequest = (): ActType => {
    return {
        type: types.GET_ALL_USER_REQUEST
    }
}

export const actFetchListAllUser = () => {
    return (dispatch: any) => {
        dispatch(actGetAllUserRequest())
        api.get('Users/getUser?keyword=1')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetAllUserSuccess(result.data.content))
                }
            })
            .catch((error) => {
                dispatch(actAllUserFail(error))
            })
    }
}

export const actSearchUser = (keyword: any) => {
    return {
        type: types.SEARCH_USER,
        payload: keyword
    }
}