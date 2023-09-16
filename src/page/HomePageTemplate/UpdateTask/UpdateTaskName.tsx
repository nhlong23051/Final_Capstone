import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actUpdateTask } from './duck/action'

type Props = {
    data: any
}

export default function UpdateTaskName({ data }: Props) {
    const dispatch: any = useDispatch()
    let [formName, setFormName] = useState(false)
    let [state, setState] = useState('')

    useEffect(() => {
        if (data?.taskName) {
            setState(data?.taskName)
        }
    }, [data?.taskName])

    const handleValue = (e: any) => {
        setState(e.target.value)
    }

    const handleSubmit = () => {
        data = { ...data, taskName: state }

        setFormName(false)
        dispatch(actUpdateTask(data))
    }

    return (
        <div className='mb-1'>
            {formName ?
                <>
                    <input className='py-1 w-full px-3 text-lg mb-1' autoFocus value={state} onChange={(e) => handleValue(e)} />
                    <Button className='' onClick={handleSubmit}>Save</Button>
                    <Button className='bg-red-300 ml-1' onClick={() => setFormName(false)}>Cancel</Button>
                </>
                : <div className='py-1 cursor-pointer px-3 text-xl rounded items-center justify-center hover:bg-gray-300 hover:transition duration-300 hover:!text-black' onClick={() => setFormName(true)}>{state}</div>}

        </div>
    )
}