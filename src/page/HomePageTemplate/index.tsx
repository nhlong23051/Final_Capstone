import { Navigate } from 'react-router-dom'
import React, { useState } from 'react';
import SideBar from './component/sideBar';

type Props = {}

export default function HomePage({ }: Props) {

  const data = localStorage.getItem('user') === null ? -1 : localStorage.getItem('user')
  const user = data === -1 ? -1 : JSON.parse(data || '')

  if (user === -1) return <Navigate to="/login" replace={true} />

  return (
    <SideBar />
  )
}