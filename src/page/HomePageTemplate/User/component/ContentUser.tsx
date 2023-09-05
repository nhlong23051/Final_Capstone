import { Button, Table, Tag } from 'antd'
import Column from 'antd/es/table/Column'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchListAllUser } from '../duck/action'

type Props = {}

export default function ContentUser({ }: Props) {
    const dispatch: any = useDispatch()
    let { loading, data, keyWord } = useSelector((state: any) => state.getAllUserReducer)

    useEffect(() => {
        dispatch(actFetchListAllUser())
    }, [])

    keyWord = keyWord.toLowerCase()

    data = data?.filter((user: any) => user.name.toLowerCase().indexOf(keyWord) !== -1)
    return (
        < Table dataSource={data} >
            <Column title="UserID" dataIndex="userId" key="userId" />
            <Column title="User name" dataIndex="name" key="name" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Phone number" dataIndex="phoneNumber" key="phoneNumber" />
            <Column
                title="Action"
                key="action"
                render={(_: any, record: any) => (
                    <>
                        <Button className='bg-blue-400' size="middle">
                            <a>Setting </a>
                        </Button>
                        <Button className='bg-red-500 mx-2' size="middle">
                            <a>Delete </a>
                        </Button>
                    </>
                )}
            />
        </Table >
    )
}