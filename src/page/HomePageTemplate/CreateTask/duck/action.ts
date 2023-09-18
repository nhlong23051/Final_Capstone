import { toast } from 'react-toastify'
import api from '../../../../Util/apiUtil'
import * as types from './const'
import { useParams } from 'react-router-dom'
import { actGetInfoProject } from '../../EditProject/duck/action'
import { actDetailProject } from '../../DetailProject/duck/action'

export const actGetAllProjects = () => {
    return (dispatch: any) => {
        api.get('Project/getAllProject')
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch({ type: types.GET_ALL_PROJECTS, payload: result.data.content })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actGetUserInProject = (projectId:any) => {
    return (dispatch: any) => {
        api.get(`Users/getUserByProjectId?idProject=${projectId}`)

            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch({ type: types.GET_USER_IN_PROJECT, payload: result.data.content })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actCreateTask = (data: any) => {
    return (dispatch: any) => {
        dispatch({ type: types.CREATE_TASK_REQUEST })
        api.post('Project/createTask', data)
            .then((result) => { 
                if (result.data.statusCode === 200) {
                    toast.success('Create task success', { autoClose: 2000, position: 'top-center' })
                    dispatch(actDetailProject(result.data.content.projectId))
                }
            })
            .catch((error) => {
                toast.error(`Create project fail !`, { autoClose: 3000, position: 'top-center' })
                console.log(error);
            })
    }
}