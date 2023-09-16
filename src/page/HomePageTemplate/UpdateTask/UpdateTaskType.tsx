import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { CloseSquareOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { actUpdateTask } from './duck/action';
import { useDispatch } from 'react-redux';

type Props = {
    data: any
}

export default function UpdateTaskType({ data }: Props) {
    const dispatch: any = useDispatch()
    const [state, setState] = useState(0)

    useEffect(() => {
        setState(data?.typeId)
    }, [data?.taskTypeDetail.id])


    const handleChange = (value: any) => {
        setState(value)
        data = { ...data, typeId: value }
        dispatch(actUpdateTask(data))
    }

    return (
        <div className='mb-3'>
            <Select
                className='w-1/3'
                value={`${state}`}
                onChange={handleChange}
                options={[
                    {
                        value: '1', label: <div className='flex items-center justify-self-center'>
                            <CloseSquareOutlined className='text-red-500 text-xl mb-1' /><span className='mx-1'>Bug</span>
                        </div>
                    },
                    {
                        value: '2', label: <div className='flex items-center justify-self-center'>
                            <CheckSquareOutlined className='text-blue-500 text-xl mb-1' /><span className='mx-1'>New task</span>
                        </div>
                    },
                ]}
            />
        </div>
    )
}