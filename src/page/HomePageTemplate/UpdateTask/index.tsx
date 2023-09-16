import { Avatar, Button, Dropdown, Form, Input, Modal, Popover, Select, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { CLOSE_FORM_UPDATE_TASK } from './duck/const'
import { useParams } from 'react-router-dom'
import UpdateTaskType from './UpdateTaskType'
import UpdateTaskName from './UpdateTaskName'
import UpdateDescription from './UpdateDescription'
import CommentComponent from './CommentComponent'
import UpdateStatus from './UpdateStatus'
import UpdateAssignees from './UpdateAssignees'
import UpdatePriority from './UpdatePriority'
import UpdateTimeEstimate from './UpdateTimeEstimate'
import UpdateTimeTracking from './UpdateTimeTracking'

type Props = {}
export default function FormUpdateTask({ }: Props) {
    const dispatch: any = useDispatch()
    const params: any = useParams()

    const { isOpen, data, userInProject } = useSelector((state: any) => state.updateTaskReducer)


    const closeModal = () => {
        dispatch({ type: CLOSE_FORM_UPDATE_TASK })
    }


    return (
        <>
            <Modal destroyOnClose className='!w-1/2' title='Update task' open={isOpen} onCancel={closeModal} footer={[]}>
                <div className='grid grid-cols-2'>
                    <div className='overflow-y-auto h-auto max-h-96 pr-3'>
                        {/* --------------- type task --------------------- */}
                        <UpdateTaskType data={data} />

                        {/* -----------------------Task name ----------------------- */}
                        <UpdateTaskName data={data} />

                        {/* --------------------------------- description -------------------------- */}
                        <UpdateDescription data={data} />

                        {/* ---------------- comments ----------------------- */}
                        <CommentComponent data={data} />
                    </div>

                    <div className='pl-2 overflow-y-auto h-auto max-h-96'>
                        {/* ------------------- Status -------------------------- */}
                        <UpdateStatus data={data} />

                        {/* ------------------------Assignees------------------------ */}
                        <UpdateAssignees data={data} />

                        {/* ------------------------Priority------------------------ */}
                        <UpdatePriority data={data} />

                        {/* ------------------------Time estimate------------------------ */}
                        <UpdateTimeEstimate data={data} />

                        {/* ------------------------Time Tracking------------------------ */}
                        <UpdateTimeTracking data={data} />
                    </div>
                </div>
            </Modal>
        </>
    )
}