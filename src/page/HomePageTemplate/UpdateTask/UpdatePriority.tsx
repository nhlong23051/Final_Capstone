import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actUpdatePriority } from './duck/action'

type Props = {
    data: any
}

export default function UpdatePriority({ data }: Props) {
    const dispatch: any = useDispatch()
    const [state, setState] = useState({ priorityId: 0})

    useEffect(() => {
        setState({
            priorityId: data?.priorityId,
        })
    }, [data?.priorityId])

    const handleChange = (value: any) => {
        setState({
            ...state,
            priorityId: value
        })
        const d:any = {taskId: data?.taskId, priorityId: value}
        dispatch(actUpdatePriority(d))
        console.log('state', state);
        console.log('value', typeof value);
    }

    return (
        <div className='flex my-3 items-center'>
            <div className='w-2/5 text-base font-bold'>Priority</div>
            <div className='w-3/5'>
                <Select
                    className='w-full'
                    value={`${state?.priorityId}`}
                    onChange={handleChange}
                    options={[
                        {
                            value: '1', label: 'High'
                        },
                        {
                            value: '2', label: 'Medium'
                        },
                        {
                            value: '3', label: 'Low'
                        },
                        {
                            value: '4', label: 'Lowest'
                        },
                    ]}
                />
            </div>
        </div>
    )
}