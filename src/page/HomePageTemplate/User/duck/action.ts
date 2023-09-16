import { toast } from 'react-toastify'
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
        api.get('Users/getUser')
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

export const actDeleteUser = (id: any) => {
    return (dispatch: any) => {
        api.delete(`Users/deleteUser?id=${id}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    toast.success('Delete success', { autoClose: 2000, position: 'top-center' })
                    dispatch(actFetchListAllUser())
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
            })
    }
}

export const actEditUser = (data: any) => {
    return (dispatch: any) => {
        api.put(`Users/editUser`,data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    toast.success('Update success', { autoClose: 2000, position: 'top-center' })
                    dispatch(actFetchListAllUser())
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
            })
    }
}