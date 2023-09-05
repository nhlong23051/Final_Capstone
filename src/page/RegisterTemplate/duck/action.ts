import * as types from './const'
import { FormRegister, TypeAct } from './types'
import api from '../../../Util/apiUtil'
import { toast } from 'react-toastify'
import { history } from '../../../App'

const actRegisterRequest = (): TypeAct => {
    return {
        type: types.REGISTER_REQUEST
    }
}

const actRegisterSuccess = (data: FormRegister): TypeAct => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: data
    }
}

const actRegisterFail = (error: any): TypeAct => {
    return {
        type: types.REGISTER_FAIL,
        payload: error
    }
}

export const actRegister = (data: FormRegister, navigate: any) => {
    return (dispatch: any) => {
        dispatch(actRegisterRequest())
        api.post('Users/signup', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actRegisterSuccess(result.data.content))

                    toast.success('Create account success')

                    navigate("/login", { replace: true });
                }

            })
            .catch((error) => {
                dispatch(actRegisterFail(error))
            })
    }
}