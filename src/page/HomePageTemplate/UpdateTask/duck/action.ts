import { toast } from 'react-toastify'
import api from '../../../../Util/apiUtil'
import { actDetailProject } from '../../DetailProject/duck/action'
import * as types from './const'

export const actCloseFormUpdateTask = () => {
    return {
        type: types.CLOSE_FORM_UPDATE_TASK,
    }
}

export const actGetTaskDetail = (taskId: number) => {
    return (dispatch: any) => {
        api.get(`Project/getTaskDetail?taskId=${taskId}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch({ type: types.GET_TASK_DETAIL, payload: result.data.content })
                }
            })
            .catch((error) => console.log(error))
    }
}

export const actOpenFormUpdateTask = (taskId: number) => {
    return (dispatch: any) => {
        dispatch({ type: types.OPEN_FORM_UPDATE_TASK })
        dispatch(actGetTaskDetail(taskId))
    }
}


export const actUpdateTask = (data: any) => {
    return (dispatch: any) => {
        api.post(`Project/updateTask`, data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    // console.log('result',result);
                    dispatch(actGetTaskDetail(data.taskId))
                    dispatch(actDetailProject(data.projectId))
                }
            })
            .catch((error) => console.log(error))
    }
}


export const actUpdateDescription = (data: any) => {
    return (dispatch: any) => {
        api.post(`Project/updateDescription`, data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    console.log('result', result);
                    dispatch(actDetailProject(data.projectId))
                }
            })
            .catch((error) => {
                toast.error(`user is not assign!`, { autoClose: 2000 })
                console.log(error)
            })
    }
}

export const actInsertComment = (data: any) => {
    return (dispatch: any) => {
        api.post('Comment/insertComment', data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    console.log('result', result);
                    dispatch(actGetTaskDetail(data.taskId))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actDeleteComment = (data: any) => {
    return (dispatch: any) => {
        api.delete(`Comment/deleteComment?idComment=${data.id}`)
            .then((result) => {
                if (result.data.statusCode === 200) {

                    dispatch(actGetTaskDetail(data.taskId))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actEditComment = (data: any, taskId: any) => {
    return (dispatch: any) => {
        api.put(`Comment/updateComment?id=${data.id}&contentComment=${data.contentComment}`)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetTaskDetail(data.taskId))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actUpdateStatus = (data: any, projectId: any) => {
    return (dispatch: any) => {
        api.put(`Project/updateStatus`, data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actDetailProject(projectId))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const actUpdatePriority = (data: any) => {
    return (dispatch: any) => {
        api.put(`Project/updatePriority`, data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetTaskDetail(data.taskId))
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
                console.log(error);
            })
    }
}

export const actUpdateTimeEstimate = (data: any) => {
    return (dispatch: any) => {
        api.put(`Project/updatePriority`, data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetTaskDetail(data.taskId))
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
                console.log(error);
            })
    }
}

export const actUpdateTimeTracking = (data: any) => {
    return (dispatch: any) => {
        api.put(`Project/updateTimeTracking`, data)
            .then((result) => {
                if (result.data.statusCode === 200) {
                    dispatch(actGetTaskDetail(data.taskId))
                }
            })
            .catch((error) => {
                toast.error(`${error.response.data.content}`, { autoClose: 2000, position: 'top-center' })
                console.log(error);
            })
    }
}