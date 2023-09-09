import { history } from '../../../../App'
import api from '../../../../Util/apiUtil'
import * as types from './const'
import { ActEditUser, User } from './types'
import { toast } from 'react-toastify'

const actEditUserRequest = (): ActEditUser => {
    return {
        type: types.EDDIT_USER_REQUEST,
    }
}

const actEditUserSuccess = (data: User): ActEditUser => {
    return {
        type: types.EDDIT_USER_SUCCESS,
        payload: data
    }
}

const actEditUserFail = (error: any): ActEditUser => {
    return {
        type: types.EDDIT_USER_FAIL,
        payload: error
    }
}

export const actEditUser = (data: User) => {
    return (dispatch: any) => {
        dispatch(actEditUserRequest())
        api.put('Users/editUser', data)
            .then((result) => {

                if (result.data.statusCode === 200) {
                    dispatch(actEditUserSuccess(result.data.content))
                }
                toast.success('Update success', { autoClose: 2000 })
                setTimeout(() => { history.go() }, 500)
            })
            .catch((error) => {
                dispatch(actEditUserFail(error))
            })
    }
}