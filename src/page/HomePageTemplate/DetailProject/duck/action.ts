import { replace } from 'formik'
import api from '../../../../Util/apiUtil'
import * as types from './const'
import { toast } from 'react-toastify'
import { actFetchListAllUser } from '../../User/duck/action'

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
export const actGetUserByProject = (projectId: any) => {
    return (dispatch: any) => {
        api.get(`Users/getUserByProjectId?idProject=${projectId}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch({ type: types.GET_USER_BY_PROJECT, payload: result.data.content })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actGetAllUser = () => {
    return (dispatch: any) => {
        api.get('Users/getUser?keyword=1')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch({ type: types.GET_ALL_USER, payload: result.data.content })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actAssignUserProject = (projectId: any, userId: any) => {
    return (dispatch: any) => {
        const data = { projectId, userId }
        api.post('Project/assignUserProject', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetUserByProject(projectId))
                    dispatch(actDetailProject(projectId))
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
                console.log(error);
            })
    }
}


export const actRemoveUserFromProject = (projectId: any, userId: any) => {
    return (dispatch: any) => {
        const data = { projectId, userId }
        api.post('Project/removeUserFromProject', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetUserByProject(projectId))
                    dispatch(actDetailProject(projectId))
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
                console.log(error);
            })
    }
}

export const actSearchUserName = (keyWord: any) => {
    return {
        type: types.SEARCH_USER_NAME,
        payload: keyWord
    }
}

const actGetAllStatus = (data: any) => {
    return {
        type: types.GET_ALL_STATUS,
        payload: data
    }
}

export const actFetchListStatus = () => {
    return (dispatch: any) => {
        api.get('Status/getAll')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetAllStatus(result.data.content))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actUpdateStatus = (data: any) => {

    return (dispatch: any) => {
        api.put('Project/updateStatus', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailProject(data.id))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}