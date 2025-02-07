import React, { useState } from "react";
import { Stack } from "@mui/material";
import SideBar from "./components/SideBar";
import Home from "./components/Home";

export const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      default:
        return null
    }
  };

  return (
    <Stack direction="row" sx={{ height: "100vh", width: "100vw" }}>
      <SideBar
        setActiveComponent={setActiveComponent}
        onToggle={(open) => setIsDrawerOpen(open)}
      />

      <Stack
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 2,
          marginLeft: isDrawerOpen ? "250px" : "64px", 
          transition: "margin-left 0.3s", 
        }}
      >
        {renderComponent()}
      </Stack>
    </Stack>
  );
};

export default Dashboard;