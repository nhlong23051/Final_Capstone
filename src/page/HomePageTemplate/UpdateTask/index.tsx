import { Avatar, Button, Dropdown, Form, Input, Modal, Popover, Select, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { CLOSE_FORM_UPDATE_TASK } from './duck/const'
import { useParams } from 'react-router-dom'
import { CloseOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons';
import UpdateTaskType from './UpdateTaskType'
import UpdateTaskName from './UpdateTaskName'
import UpdateDescription from './UpdateDescription'
import CommentComponent from './CommentComponent'
import UpdateStatus from './UpdateStatus'
import UpdateAssignees from './UpdateAssignees'
import UpdatePriority from './UpdatePriority'
import UpdateTimeEstimate from './UpdateTimeEstimate'
import UpdateTimeTracking from './UpdateTimeTracking'
import { actDeleteTask } from './duck/action'

type Props = {}
export default function FormUpdateTask({ }: Props) {
    const dispatch: any = useDispatch()
    const params: any = useParams()

    const { isOpen, data } = useSelector((state: any) => state.updateTaskReducer)
    const [confirmDelete, setConfirmDelete] = useState(false)


    const closeModal = () => {
        dispatch({ type: CLOSE_FORM_UPDATE_TASK })
    }

    const handleConfirm = (id: any) => {
        setConfirmDelete(true)
    }


    return (
        <>
            <Modal destroyOnClose className='!z-10 !w-full md:!w-3/4' open={isOpen} onCancel={closeModal} closeIcon={false} footer={[
                <div className='my-4 flex justify-end items-center '>
                    <Button className='border-none hover:bg-gray-300 mr-3' onClick={() => setConfirmDelete(true)}>
                        <DeleteOutlined className='text-red-500 text-xl ' />
                    </Button>

                    <Button className='border-none hover:bg-gray-300' onClick={() => dispatch({ type: CLOSE_FORM_UPDATE_TASK })}>
                        <CloseOutlined className=' text-xl' />
                    </Button>
                </div>
            ]}  >
                <div className='md:grid md:grid-cols-2'>
                    <div className='overflow-y-auto h-auto md:max-h-96 pr-3'>
                        {/* --------------- type task --------------------- */}
                        <UpdateTaskType data={data} />

                        {/* -----------------------Task name ----------------------- */}
                        <UpdateTaskName data={data} />

                        {/* --------------------------------- description -------------------------- */}
                        <UpdateDescription data={data} />

                        {/* ------------------------Assignees------------------------ */}
                        <UpdateAssignees data={data} />

                        {/* ------------------------Priority------------------------ */}
                        <UpdatePriority data={data} />

                        {/* ------------------- Status -------------------------- */}
                        <UpdateStatus data={data} />
                    </div>

                    <div className='overflow-y-auto h-auto md:max-h-96'>
                        {/* ------------------------Time estimate------------------------ */}
                        <UpdateTimeEstimate data={data} />

                        {/* ------------------------Time Tracking------------------------ */}
                        <UpdateTimeTracking data={data} />

                        {/* ---------------- comments ----------------------- */}
                        <CommentComponent data={data} />
                    </div>
                </div>
            </Modal>

            <Modal destroyOnClose className='!z-50' open={confirmDelete} onCancel={() => setConfirmDelete(false)} footer={[
                <div className=''>
                    <Button className='bg-red-600 mr-1' onClick={() => {
                        const d: any = { taskId: data.taskId, projectId: params.id }
                        dispatch(actDeleteTask(d))
                        setConfirmDelete(false)
                        closeModal()
                    }} >Yes</Button>
                    <Button onClick={() => setConfirmDelete(false)}>No</Button>
                </div>
            ]}>
                <div className='h-auto'>
                    <div className='text-xl'>
                        <WarningOutlined className='pb-2 mr-2 text-yellow-400' /> Are you sure to delete this task?
                    </div>
                </div>
            </Modal>
        </>
    )
}