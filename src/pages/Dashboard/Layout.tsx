import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(true)

  return (
    <Stack direction='row' sx={{ height: '100vh', width: '100vw' }}>
      <SideBar onToggle={setDrawerOpen} />
      <Stack
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          ml: drawerOpen ? '250px' : '64px',
          transition: 'margin-left 0.3s'
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  )
}
