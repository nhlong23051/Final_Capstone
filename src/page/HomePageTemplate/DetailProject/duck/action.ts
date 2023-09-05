import { replace } from 'formik'
import api from '../../../../Util/apiUtil'
import * as types from './const'
import { toast } from 'react-toastify'

const actDetailProjectSuccess = (data: any) => {
    return {
        type: types.GET_PROJECT_DETAIL_SUCCESS,
        payload: data
    }
}

const actDetailProjectFail = (error: any) => {
    return {
        type: types.GET_PROJECT_DETAIL_FAIL,
        payload: error
    }
}

const actDetailProjectRequest = () => {
    return {
        type: types.GET_PROJECT_DETAIL_REQUEST
    }
}

export const actDetailProject = (id: any) => {
    return (dispatch: any) => {
        dispatch(actDetailProjectRequest())
        api.get(`Project/getProjectDetail?id=${id}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailProjectSuccess(result.data.content))
                }
            })
            .catch((error) => {
                dispatch(actDetailProjectFail(error))
            })
    }
}

export const actSearchUserName = (keyWord: any) => {
    return {
        type: types.SEARCH_USER_NAME,
        payload: keyWord
    }
}

export const actAssignUserProject = (projectId: any, userId: any) => {
    return (dispatch: any) => {
        const data = { projectId, userId }
        api.post('Project/assignUserProject', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailProject(projectId))
                    toast.success('Add user success', { position: 'top-center' })
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })

                // console.log(error);
            })
    }
}

export const actRemoveUserFromProject = (projectId: any, userId: any) => {
    return (dispatch: any) => {
        const data = { projectId, userId }
        api.post('Project/removeUserFromProject', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailProject(projectId))
                    toast.success('Remove user success', { position: 'top-center' })
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })

                // console.log(error);
            })
    }
}