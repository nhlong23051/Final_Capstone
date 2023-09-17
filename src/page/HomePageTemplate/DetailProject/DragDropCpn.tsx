import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CloseSquareOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { actOpenFormUpdateTask } from '../UpdateTask/duck/action';
import { OPEN_DRAWER_CREATE_TASK } from '../CreateTask/duck/const';
import CreateTask from '../CreateTask';
import { actDetailProject, actUpdateStatus } from './duck/action';
import { useParams } from 'react-router-dom';

type Props = {
    colums: any,
}

export default function DragDropCpn({ colums }: Props) {
    let [state, setState] = useState(colums)
    const [open, setOpen] = useState(false)
    const params: any = useParams()
    const dispatch: any = useDispatch()
    useEffect(() => {
        if (colums) {
            setState(colums)
        }
    }, [colums])

    const onDragEnd = (result: any) => {
        let { destination, source, draggableId } = result
        // destination là colum sau khi di chuyển đến 
        // source là colum đang đứng
        // draggableId là Id của task dc di chuyển 

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        const indexColumStart = colums.findIndex((a: any) => a.statusId === source.droppableId)
        const indexColumFinish = colums.findIndex((a: any) => a.statusId === destination.droppableId)
        const taskSelect = state[indexColumStart].lstTaskDeTail[source.index]


        const newColumStart = state[indexColumStart].lstTaskDeTail.splice(source.index, 1)
        const newColumFinish = state[indexColumFinish].lstTaskDeTail.splice(destination.index, 0, taskSelect)
        const d: any = { taskId: draggableId, statusId: destination.droppableId, id: params.id }

        dispatch(actUpdateStatus(d))
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='md:grid md:grid-cols-2 xl:grid-cols-4 pt-4 gap-5 mx-10'>
                {colums?.map((colum: any, index: any) => {
                    return <Droppable droppableId={colum.statusId} key={index}>
                        {(provided: any) => (
                            <div className='mb-2 border border-gray-300 rounded-md h-full w-full bg-gray-300 relative'>
                                <div className='m-2 w-auto h-auto rounded font-mono flex justify-between'>
                                    <span className='bg-purple-200 w-auto p-1 rounded '>{colum.statusName}</span>
                                    {colum.statusId !== '1' ? '' : (
                                        <div className=' w-auto font-xl rounded '>
                                            <div onClick={() => dispatch({ type: OPEN_DRAWER_CREATE_TASK, payload: <CreateTask /> })} className='cursor-pointer ease-in-out duration-300 p-1 rounded hover:bg-green-400 text-centerrounded'>
                                                + Create
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ minHeight: '80px' }}
                                    className={`block w-full !h-full px-2 lg:px-3 focus:bg-purple-400`}>
                                    {colum?.lstTaskDeTail.map((task: any, index: any) => {

                                        return <Draggable draggableId={task.taskId.toString()} index={index} key={index}>
                                            {(provided: any) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`h-24 w-full ease-in-out duration-300 leading-10 my-2 rounded bg-gray-400 text-white text-center hover:bg-gray-500  active:bg-green-400`}
                                                    onClick={() => {
                                                        dispatch(actOpenFormUpdateTask(task.taskId))
                                                    }}
                                                >
                                                    <div className='flex justify-between items-center h-full lg:p-3'>
                                                        <div className=''>
                                                            <div className='text-lg text-black h-1/2 pb-1 '>{task.taskName}</div>
                                                            <div className='px-2 flex items-center justify-center h-7'>
                                                                <span className=''>{task.taskTypeDetail.id === 1 ? <CloseSquareOutlined className='text-xl text-red-500' /> : <CheckSquareOutlined className='text-xl text-blue-500' />}</span>
                                                                <span className='leading-8 font-lg font-semibold rounded px-3 mx-2 h-8'>{task.priorityTask.priority}</span>
                                                            </div>
                                                        </div>
                                                        <div className='h-auto mx-2'>
                                                            {task.assigness.map((mem: any) => {
                                                                return <Avatar className='' key={mem.id} src={mem.avatar} alt=''></Avatar>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable >
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable >
                })}
            </div>
        </DragDropContext>
    )
}