import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

type Props = { task: any, index: any }

export default function Task({ task, index }: Props) {
    const t = task.taskId.toString()
    // console.log(t);
    
    return (
        <Draggable draggableId={t} index={index} >
            {(provided: any, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    className={`h-10 w-full ease-in-out duration-300 leading-10 my-2 rounded bg-gray-400 text-white text-center hover:bg-gray-500  active:bg-green-400`}
                >
                    {task.taskName}
                </div>
            )}
        </Draggable >
    )
}