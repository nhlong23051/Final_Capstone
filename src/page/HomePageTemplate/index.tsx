import { Navigate, Outlet } from 'react-router-dom'
import React, { useState } from 'react';
import { Button, Dropdown, Layout, Menu, MenuProps, Space, theme } from 'antd'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { UserOutlined, HomeOutlined, PieChartOutlined, ProfileOutlined, PlusSquareOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import HeaderCpn from './component/HeaderCpn';
import FormCreateTask from './CreateTask/FormCreateTask';
import CreateTask from './CreateTask';
import { OPEN_DRAWER_CREATE_TASK } from './CreateTask/duck/const';
import FormUpdateTask from './UpdateTask';


type Props = {}

export default function HomePage({ }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch: any = useDispatch()

  const data = localStorage.getItem('user') === null ? -1 : localStorage.getItem('user')
  const user = data === -1 ? -1 : JSON.parse(data || '')

  if (user === -1) return <Navigate to="/login" replace={true} />

  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }


  const items: MenuItem[] = [
    getItem('Home', 'home', <NavLink to='/'><HomeOutlined /></NavLink>,),
    getItem('Project ', 'project', <PieChartOutlined />, [
      getItem('View all project', 'viewallproject', <NavLink to='/'></NavLink>),
      getItem('Create project', 'createproject', <NavLink to='/create-project'></NavLink>),
    ]),
    getItem('User', 'user', <UserOutlined />, [
      getItem('View all user', 'viewalluser', <NavLink to='/all-user'></NavLink>),
    ]),
    getItem('Profile', 'profile', <ProfileOutlined />, [
      getItem('View profile', 'viewprofile', <NavLink to='/profile'></NavLink>),
    ]),
    getItem('Create project', 'createProject', <NavLink to='/create-project'><PlusSquareOutlined /></NavLink>),
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <HeaderCpn />
      <Layout className='h-full' >
        <Sider breakpoint={'lg'} collapsedWidth={50} style={{ height: '100vh' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>

        <Layout >
          <Outlet />
        </Layout>

      </Layout>
      <FormCreateTask />
      <FormUpdateTask />
    </>
  )
}