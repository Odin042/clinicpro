import React, { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Stack,
  Button,
  useMediaQuery
} from "@mui/material"
import { ChevronLeft, Menu, Home } from "@mui/icons-material"
import EditCalendarIcon from "@mui/icons-material/EditCalendar"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import People from '@mui/icons-material/People'
import logo from "../../../../assets/clinic360prowhite.png"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

const SideBar = ({ setActiveComponent, onToggle }: any) => {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const toggleDrawer = () => {
    setOpen(!open)
    onToggle(!open)
  }

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <>
      {!open && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: "#03045e",
            color: "white",
            "&:hover": { backgroundColor: "#001d4a" }
          }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: open ? 250 : 64,
            overflowX: "hidden",
            transition: "width 0.3s",
            boxShadow: 3,
            borderRadius: open ? "0 16px 16px 0" : "0",
            backgroundColor: "#03045e",
            color: "white"
          }
        }}
      >
        <Stack
          direction="column"
          sx={{
            height: "100%",
            justifyContent: "space-between"
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={open ? "flex-end" : "center"}
            sx={{ p: 1 }}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <ChevronLeft />
            </IconButton>
          </Stack>

          <Stack
            sx={{
              flexGrow: 1,
              p: open ? 2 : 1,
              alignItems: open ? "flex-start" : "center"
            }}
          >
            {open && <img src={logo} alt="Logo Clinic360" width="150" />}
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setActiveComponent("home"); if (isMobile) toggleDrawer() }}>
                  <Home sx={{ color: "white" }} />
                  {open && <ListItemText primary="Inicio" sx={{ ml: 2, color: "white" }} />}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setActiveComponent("scheduling"); if (isMobile) toggleDrawer() }}>
                  <EditCalendarIcon sx={{ color: "white" }} />
                  {open && <ListItemText primary="Agendamentos" sx={{ ml: 2, color: "white" }} />}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setActiveComponent("patients"); if (isMobile) toggleDrawer() }}>
                  <People sx={{ color: "white" }} />
                  {open && <ListItemText primary="Pacientes" sx={{ ml: 2, color: "white" }} />}
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>

          <Stack sx={{ p: 1, alignItems: "center" }}>
            <Button
              startIcon={<ExitToAppIcon />}
              onClick={handleLogout}
              sx={{
                color: "white",
                justifyContent: open ? "flex-start" : "center",
                textTransform: "none",
                width: "100%"
              }}
            >
              {open && "Sair"}
            </Button>
            {open && (
              <Typography variant="caption" color="white" sx={{ mt: 1 }}>
                Clinic360pro V0.0.1
              </Typography>
            )}
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}

export default SideBar
