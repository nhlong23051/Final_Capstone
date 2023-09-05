import React from 'react'
import { Layout, Button } from 'antd';
import ContentProject from './component/ContentProject';
import Search from 'antd/es/input/Search';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actSearchProject } from './duck/action';

type Props = {}

const { Content } = Layout;

export default function Project({ }: Props) {
    const dispatch: any = useDispatch()

    const myProfile = JSON.parse(localStorage.getItem('user') || '')
    return (
        <Layout>
            <Content style={{ margin: '0 16px' }}>
                <div style={{ margin: '16px 0' }} className='grid grid-cols-2 items-center justify-center' >
                    <h2 className='text-center text-4xl'>Project</h2>
                    <Button className=' w-52 h-14 text-xl font-medium right-0'><NavLink to='/create-project'>Create Project</NavLink></Button>
                </div>
                <Search onChange={(e) => dispatch(actSearchProject(e.target.value))} placeholder='Search project ...' className='py-4'></Search>
                <div style={{ padding: 24, minHeight: 360 }}>
                    <ContentProject />
                </div>
            </Content>
        </Layout>
    )
}