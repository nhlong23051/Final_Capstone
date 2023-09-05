import React from 'react'
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

type Props = {
    colum: any,
    tasks: any,
}

export default function Colum({ colum, tasks }: Props) {
    
    return (
        <>
            <div className='border border-gray-300 rounded-md h-full w-full bg-gray-300 relative'>
                <Droppable droppableId={colum.statusId} >
                    {(provided: any, snapshot: any) => (
                        <>
                            <div className='m-2 w-auto h-auto rounded font-mono flex justify-between'>
                                <span className='bg-purple-200 w-auto p-1 rounded '>{colum.statusName}</span>
                                {colum.statusId !== '1' ? '' : (
                                    <div className=' w-auto font-xl rounded '>
                                        <div className='ease-in-out duration-300 p-1 rounded hover:bg-green-400 text-centerrounded'>
                                            + Create
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr />
                            <div
                                className={`flex-grow h-full px-3`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {tasks.map((task: any, index: any) => <Task key={task.taskId} task={task} index={index} />)}
                                {provided.placeholder}
                            </div>

                        </>
                    )}
                </Droppable >
            </div>
        </>
    )
}