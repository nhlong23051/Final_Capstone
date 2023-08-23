import api from '../../../Util/apiUtil'
import * as types from './const'
import { TypeAct, UserLogin, FormLogin } from './types'

const actLoginRequest = (): TypeAct => {
    return {
        type: types.LOGIN_REQUEST,
    }
}

const actLoginSuccess = (data: UserLogin): TypeAct => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    }
}

const actLoginFail = (error: any): TypeAct => {
    return {
        type: types.LOGIN_REQUEST,
        payload: error
    }
}

export const actLogin = (data: FormLogin, navigate: any) => {
    return (dispatch: any) => {
        dispatch(actLoginRequest())
        api.post('Users/signin', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actLoginSuccess(result.data.content))
                    
                    localStorage.setItem('user',JSON.stringify(result.data.content))

                    navigate("/", { replace: true });
                }

            })
            .catch(error => dispatch(actLoginFail(error)))
    }
}