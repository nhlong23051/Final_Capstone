import { toast } from 'react-toastify'
import api from '../../../../Util/apiUtil'
import * as types from './const'

export const actGetInfoProject = (id: any) => {
    return (dispatch: any) => {
        dispatch({ type: types.GET_DETAIL_PROJECT_REQUEST })
        api.get(`Project/getProjectDetail?id=${id}`)
            .then((result: any) => {
                if (result.data.statusCode === 200) {
                    dispatch({ type: types.GET_DETAIL_PROJECT, payload: result.data.content })
                }
            })
            .catch((error: any) => {
                console.log(error);
            })
    }
}

export const actEditProject = (data: any, projectId: any) => {
    return (dispatch: any) => {
        api.put(`Project/updateProject?projectId=${projectId}`, data)
            .then((result: any) => {
                toast.success('Update project success!')
                dispatch(actGetInfoProject(projectId))
            })
            .catch((error: any) => {
                toast.error(`${error.response.data.content!}`)
                console.log(error);
            })
    }
}