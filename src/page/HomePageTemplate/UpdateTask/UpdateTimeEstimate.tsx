import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actUpdateTimeEstimate } from './duck/action'

type Props = { data: any }

export default function UpdateTimeEstimate({ data }: Props) {
    const dispatch: any = useDispatch()
    const [state, setState] = useState({ taskId: 0, originalEstimate: 0 })
    const [form, setForm] = useState(false)

    useEffect(() => {
        setState({
            taskId: data?.taskId,
            originalEstimate: data?.originalEstimate
        })
    }, [data?.originalEstimate])

    const handleChange = (e: any) => {
        setState({
            ...state,
            originalEstimate: e.target.value
        })
    }
    
    return (
        <div className='flex my-4 items-center'>
            <div className='w-2/5 text-base font-bold'>Original estimate</div>
            <div className='w-3/5'>
                {form ?
                    <div className='flex'>
                        <Input onChange={(e) => handleChange(e)} value={state?.originalEstimate} placeholder='original estimate...' type='number' />
                        <Button className='ml-1' onClick={() => dispatch(actUpdateTimeEstimate(state))}>Save</Button>
                        <Button className='bg-red-300' onClick={() => setForm(false)}>Cancel</Button>
                    </div>
                    :
                    <div className='rounded w-full p-1 cursor-pointer hover:bg-gray-300' onClick={() => setForm(true)}>{state?.originalEstimate}m</div>}
            </div>
        </div>
    )
}