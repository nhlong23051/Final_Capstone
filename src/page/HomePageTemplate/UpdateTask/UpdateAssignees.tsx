import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { actUpdateTask } from './duck/action'
import { useDispatch } from 'react-redux'

type Props = {
    data: any
}

export default function UpdateAssignees({ data }: Props) {
    const dispatch:any = useDispatch()
    let { userByProject } = useSelector((state: any) => state.detailProjectReducer)
    const [state, setState] = useState([])

    useEffect(() => {
        setState(data?.assigness)
    }, [data?.assigness])

    const handleChange = (value: any) => {
        const d: any = { ...data, listUserAsign: value }
        dispatch(actUpdateTask(d))
    }

    return (
        <div className='flex my-3 items-center'>
            <div className='w-2/5'>Assignees</div>
            <div className='w-3/5'>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Choose assignees"
                    value={data?.assigness.map((a: any) => (`${a.id}`))}
                    onChange={handleChange}
                    options={userByProject?.map((a: any) => ({ label: `${a.name}`, value: `${a.userId}` }))}
                />
            </div>
        </div>
    )
}