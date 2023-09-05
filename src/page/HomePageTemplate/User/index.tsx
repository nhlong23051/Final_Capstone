import { Button, Layout } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react'
import { NavLink } from 'react-router-dom';
import ContentUser from './component/ContentUser';
import { useDispatch } from 'react-redux';
import { actSearchUser } from './duck/action';

type Props = {}

const { Content } = Layout;

export default function AllUser({ }: Props) {
    const dispatch: any = useDispatch()
    return (
        <Layout>
            <Content style={{ margin: '0 16px' }}>
                <div style={{ margin: '16px 0' }} className='text-center' >
                    <h2 className='text-center text-4xl'>User</h2>
                </div>
                <Search
                    onChange={(e) => dispatch(actSearchUser(e.target.value))}
                    placeholder='Search user ...'
                    className='py-4'></Search>
                <div style={{ padding: 24, minHeight: 360 }}>
                    <ContentUser />
                </div>
            </Content>
        </Layout>
    )
}