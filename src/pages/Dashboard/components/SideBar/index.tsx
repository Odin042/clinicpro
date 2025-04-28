import React, { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Stack,
  Button,
  useMediaQuery
} from '@mui/material'
import { ChevronLeft, Menu, Home as HomeIcon } from '@mui/icons-material'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import PeopleIcon from '@mui/icons-material/People'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PaidIcon from '@mui/icons-material/Paid'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import logo from '../../../../assets/clinic360prowhite.png'

interface SideBarProps {
  onToggle: (open: boolean) => void
}

export default function SideBar({ onToggle }: SideBarProps) {
  const [open, setOpen] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const location = useLocation()

  const toggleDrawer = () => {
    setOpen(!open)
    onToggle(!open)
  }

  return (
    <>
      {!open && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: '#03045e',
            color: 'white'
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor='left'
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: open ? 250 : 64,
            overflowX: 'hidden',
            transition: 'width 0.3s',
            backgroundColor: '#03045e',
            color: 'white'
          }
        }}
      >
        <Stack direction='column' sx={{ height: '100%', justifyContent: 'space-between' }}>
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: 'white', alignSelf: open ? 'flex-end' : 'center', m: 1 }}
          >
            <ChevronLeft />
          </IconButton>

          <Stack sx={{ flexGrow: 1, p: open ? 2 : 1, alignItems: open ? 'flex-start' : 'center' }}>
            {open && <img src={logo} alt='Logo Clinic360' width='150' />}
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to='/dashboard'
                  selected={location.pathname === '/dashboard'}
                  onClick={isMobile ? toggleDrawer : undefined}
                >
                  <HomeIcon sx={{ color: 'white' }} />
                  {open && <ListItemText primary='Início' sx={{ ml: 2, color: 'white' }} />}
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to='/dashboard/calendar'
                  selected={location.pathname.startsWith('/dashboard/calendar')}
                  onClick={isMobile ? toggleDrawer : undefined}
                >
                  <EditCalendarIcon sx={{ color: 'white' }} />
                  {open && <ListItemText primary='Agendamentos' sx={{ ml: 2, color: 'white' }} />}
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to='/dashboard/patients'
                  selected={location.pathname.startsWith('/dashboard/patients')}
                  onClick={isMobile ? toggleDrawer : undefined}
                >
                  <PeopleIcon sx={{ color: 'white' }} />
                  {open && <ListItemText primary='Pacientes' sx={{ ml: 2, color: 'white' }} />}
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to='/dashboard/financial'
                  selected={location.pathname.startsWith('/dashboard/financial')}
                  onClick={isMobile ? toggleDrawer : undefined}
                >
                  <PaidIcon sx={{ color: 'white' }} />
                  {open && <ListItemText primary='Financeiro' sx={{ ml: 2, color: 'white' }} />}
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>

          <Stack sx={{ p: 1, alignItems: 'center' }}>
            <Button
              startIcon={<ExitToAppIcon />}
              component={RouterLink}
              to='/'
              sx={{
                color: 'white',
                textTransform: 'none',
                width: '100%',
                justifyContent: open ? 'flex-start' : 'center'
              }}
            >
              {open && 'Sair'}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}
