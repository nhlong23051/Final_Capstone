import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actUpdateStatus } from './duck/action'
import { useParams } from 'react-router-dom'

type Props = {
    data: any
}

export default function UpdateStatus({ data }: Props) {
    const dispatch: any = useDispatch()
    const params: any = useParams()
    const [state, setState] = useState({ statusId: '', taskId: 0 })

    useEffect(() => {
        setState({
            ...state,
            statusId: data?.statusId,
            taskId: data?.taskId
        })
    }, [data?.taskId])

    const handleChangeStatus = (values: any) => {
        setState({
            ...state,
            statusId: values,
        })
        const d: any = { statusId: values, taskId: data?.taskId }
        const projectId: any = params.id
        dispatch(actUpdateStatus(d, projectId))
    }

    return (

        <div className='flex my-4 items-center'>
            <div className='w-2/5 text-base font-bold'>Status</div>
            <div className='w-3/5'>
                <Select
                    className='w-full'
                    value={`${state?.statusId}`}
                    onChange={handleChangeStatus}
                    options={[
                        {
                            value: '1', label: 'BACKLOG'
                        },
                        {
                            value: '2', label: 'SELECTED FOR DEVELOPMENT'
                        },
                        {
                            value: '3', label: 'IN PROGRESS'
                        },
                        {
                            value: '4', label: 'DONE'
                        },
                    ]}
                />
            </div>
        </div>
    )
}