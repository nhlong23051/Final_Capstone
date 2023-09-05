import { replace } from 'formik'
import api from '../../../../Util/apiUtil'
import * as types from './const'
import { toast } from 'react-toastify'

const actCreateProjectSuccess = (data: any) => {
    return {
        type: types.CREATE_PROJECT_SUCCESS,
        payload: data
    }
}

const actCreateProjectFail = (error: any) => {
    return {
        type: types.CREATE_PROJECT_FAIL,
        payload: error
    }
}

const actCreateProjectRequest = () => {
    return {
        type: types.CREATE_PROJECT_REQUEST
    }
}

export const actCreateProject = (data: any, navigate: any) => {
    return (dispatch: any) => {
        dispatch(actCreateProjectRequest())
        api.post('Project/createProject', data)
            .then((result) => {
                console.log(result);

                if (result.data.statusCode === 200) {
                    dispatch(actCreateProjectSuccess(result.data.content))
                    toast.success('Create project success',{position:'top-center'})
                    navigate(`/project/${result.data.content.id}` )
                }
            })
            .catch((error) => {
                dispatch(actCreateProjectFail(error))
            })
    }
}
