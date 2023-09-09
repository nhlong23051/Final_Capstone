import { Button, Drawer } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CLOSE_DRAWER_CREATE_TASK } from './duck/const';
import { useDispatch } from 'react-redux';
import CreateTask from '.';

type Props = {}

export default function FormCreateTask({ }: Props) {
    const [open, setOpen] = useState(false);
    const { openCrateTask, formCreateTask } = useSelector((state: any) => state.modalCreateTaskReducer)
    const dispatch: any = useDispatch()

    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER_CREATE_TASK })
    };
    return (
        <div>
            <Drawer destroyOnClose={true} closeIcon={false} width={720} onClose={onClose} open={openCrateTask} >
                {formCreateTask}
            </Drawer>
        </div>
    )
}