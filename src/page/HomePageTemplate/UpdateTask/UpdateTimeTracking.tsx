import { Button, Input, Slider } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actUpdateTimeTracking } from './duck/action'

type Props = {
    data: any
}

export default function UpdateTimeTracking({ data }: Props) {
    let [formTimeTracking, setFormTimeTracking] = useState(false)
    const dispatch: any = useDispatch()
    const [state, setState] = useState({ taskId: 0, timeTrackingSpent: 0, timeTrackingRemaining: 0 })

    const handleChange = (e: any) => {
        let { name, value } = e.target
        setState({
            ...state,
            taskId: data?.taskId,
            [name]: value
        })
    }


    return (
        <div>
            {formTimeTracking ?
                <>
                    <div className='flex my-4 items-center rounded p-2 hover:bg-gray-300  hover:transition duration-300' >
                        <div className='w-2/5'>
                            <div className='w-full text-base font-bold cursor-pointer py-2 rounded' onClick={() => setFormTimeTracking(false)}>Time tracking</div>
                        </div>
                        <div className='w-3/5'>
                            <Input onChange={(e) => handleChange(e)} name='timeTrackingSpent' className='mb-2' placeholder='Time spent' type='number' />
                            <Input onChange={(e) => handleChange(e)} name='timeTrackingRemaining' placeholder='Time remaining' type='number' />
                            <Button className='mt-1 bg-blue-300' onClick={() => dispatch(actUpdateTimeTracking(state))}>Update</Button>
                            <Button className='ml-1 bg-red-300' onClick={() => setFormTimeTracking(false)}>Cancel</Button>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='w-full text-base font-bold cursor-pointer py-2 rounded hover:bg-gray-300 hover:transition duration-300' onClick={() => setFormTimeTracking(true)}>Time tracking</div>
                    <div className="icon-wrapper flex">
                        <div >{data?.timeTrackingSpent}m logged</div>
                        <Slider className='w-full' min={0} max={data?.timeTrackingRemaining} defaultValue={data?.timeTrackingRemaining - data?.timeTrackingSpent} />
                        <div >{data?.timeTrackingRemaining}m remaining</div>
                    </div>
                </>}
        </div>

    )
}