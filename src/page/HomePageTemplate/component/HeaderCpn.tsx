import { Dropdown, Layout, MenuProps, Space } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import { actLogOut } from '../../LoginTemplate/duck/action';

type Props = {}

export default function HeaderCpn({ }: Props) {

    const dispatch: any = useDispatch()

    const myProfile = JSON.parse(localStorage.getItem('user') || '')

    let { Header } = Layout

    const items: MenuProps['items'] = [
        {
            label: (<NavLink to='/profile'>View Profiles</NavLink>),
            key: '0',
        },
        {
            label: (<NavLink onClick={() => dispatch(actLogOut())} to='/login'> Logout</NavLink>),
            key: '0',
        },
    ];



    return (
        <Header style={{ padding: 30, height: '60px' }} className='flex items-center justify-between w-full'>
            <div></div>
            {/* <NavLink className='text-4xl text-white' to='/'><HomeOutlined style={{ marginBottom: '15px' }} /></NavLink> */}
            <div>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className='text-white'>
                            <img className='rounded-full w-8 h-8' src={myProfile.avatar} alt='' />
                            {myProfile.name}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </Header>

    )
}