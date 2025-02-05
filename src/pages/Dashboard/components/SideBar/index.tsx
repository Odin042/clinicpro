import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Home, Settings, Info  } from "@mui/icons-material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import logo from "../../../../assets/clinic360prowhite.png";

const Toolpad = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      PaperProps={{
        sx: {
          width: open ? 250 : 64,
          overflowX: "hidden",
          transition: "width 0.3s",
          boxShadow: 3,
          borderRadius: open ? "0 16px 16px 0" : "0",
          backgroundColor: "#03045e", 
          color: "white", 
        },
      }}
    >
      <Stack
        direction="column"
        sx={{
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={open ? "flex-end" : "center"}
          sx={{ p: 1 }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Stack>
        <Stack
          sx={{
            flexGrow: 1,
            p: open ? 2 : 1,
            alignItems: open ? "flex-start" : "center",
          }}
        >
          {open && (
           <img src={logo} alt="Logo Clinic360" width="150" />
          )}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Home sx={{ color: "white" }} />
                {open && <ListItemText primary="Inicio" sx={{ ml: 2, color: "white" }} />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <PeopleAltIcon sx={{ color: "white" }} />
                {open && <ListItemText primary="Cadastro de pacientes" sx={{ ml: 2, color: "white" }} />}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <EditCalendarIcon sx={{ color: "white" }} />
                {open && <ListItemText primary="Agendamentos" sx={{ ml: 2, color: "white" }} />}
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
        <Stack
          sx={{
            p: 1,
            alignItems: "center",
          }}
        >
          <Typography variant="caption" color="white">
            Clinic360pro   V1.0.0
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default Toolpad;
