import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CloseSquareOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { actOpenFormUpdateTask } from '../UpdateTask/duck/action';
import { OPEN_DRAWER_CREATE_TASK } from '../CreateTask/duck/const';
import CreateTask from '../CreateTask';

type Props = {
    colums: any,
}

export default function DragDropCpn({ colums }: Props) {
    let [state, setState] = useState(null)
    const [open, setOpen] = useState(false)
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

        const start = colums[colums.findIndex((a: any) => a.statusId === source.droppableId)]
        const tasks = start.lstTaskDetail
        // tasks.splice(source.index, 1)
        // const start = colums.findIndex((c: any) => )
        // console.log('destination', destination);
        console.log('source', source);
        console.log('tasks', tasks);


        // // const newTaskId = Array.from(start.lstTaskDeTail)
        // dispatch(actUpdateStatus(draggableId, finish.statusId))


        // const start = state.colums[source.droppableId]
        // const finish = state.colums[destination.droppableId]

        // if (start === finish) {

        //   const newTaskId = Array.from(start.taskIds)
        //   newTaskId.splice(source.index, 1)
        //   newTaskId.splice(destination.index, 0, draggableId)

        //   const newColum = {
        //     ...start,
        //     taskIds: newTaskId
        //   }

        //   const newState = {
        //     ...state,
        //     colums: {
        //       ...state.colums,
        //       [newColum.id]: newColum
        //     }
        //   }

        //   setState(newState)
        //   return
        // }

        // const startTaskIds = Array.from(start.taskIds)
        // startTaskIds.splice(source.index, 1)
        // const newStart = {
        //   ...start,
        //   taskIds: startTaskIds
        // }

        // const finishTaskIds = Array.from(finish.taskIds)
        // finishTaskIds.splice(destination.index, 0, draggableId)
        // const newFinish = {
        //   ...finish,
        //   taskIds: finishTaskIds
        // }

        // const newState = {
        //   ...state,
        //   colums: {
        //     ...state.colums,
        //     [newStart.id]: newStart,
        //     [newFinish.id]: newFinish
        //   }
        // }
        // setState(newState)
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='grid grid-cols-4 pt-4 gap-5 mx-10'>
                {colums?.map((colum: any, index: any) => {
                    return <Droppable droppableId={colum.statusId} key={index}>
                        {(provided: any) => (
                            <div className='border border-gray-300 rounded-md h-full w-full bg-gray-300 relative'>
                                <div className='m-2 w-auto h-auto rounded font-mono flex justify-between'>
                                    <span className='bg-purple-200 w-auto p-1 rounded '>{colum.statusName}</span>
                                    {colum.statusId !== '1' ? '' : (
                                        <div className=' w-auto font-xl rounded '>
                                            <div onClick={() => dispatch({ type: OPEN_DRAWER_CREATE_TASK, payload: <CreateTask /> })} className='ease-in-out duration-300 p-1 rounded hover:bg-green-400 text-centerrounded'>
                                                + Create
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`block w-full !h-full px-3 focus:bg-purple-400`}>
                                    {colum?.lstTaskDeTail.map((task: any, index: any) => {

                                        return <Draggable draggableId={task.taskId.toString()} index={index} key={index}>
                                            {(provided: any) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`h-auto w-full ease-in-out duration-300 leading-10 my-2 rounded bg-gray-400 text-white text-center hover:bg-gray-500  active:bg-green-400`}
                                                    onClick={() => {
                                                        dispatch(actOpenFormUpdateTask(task.taskId))
                                                    }}
                                                >
                                                    <div className='flex justify-between items-center p-3'>
                                                        <div className=''>
                                                            <div className='text-lg text-black h-1/2 pb-1 '>{task.taskName}</div>
                                                            <div className='px-2 flex items-center justify-center h-7'>
                                                                <span className=''>{task.taskTypeDetail.id === 1 ? <CloseSquareOutlined className='text-xl text-red-500' /> : <CheckSquareOutlined className='text-xl text-blue-500' />}</span>
                                                                <span className='leading-8 font-lg font-semibold rounded px-3 mx-2 h-8'>{task.priorityTask.priority}</span>
                                                            </div>
                                                        </div>
                                                        <div className='h-auto mx-2'>
                                                            {task.assigness.map((mem: any) => {
                                                                return <Avatar key={mem.id} src={mem.avatar} alt=''></Avatar>
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