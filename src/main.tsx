import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "./styles/themes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppRoutes from "./routes"



const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
        <Main />
  </React.StrictMode>
)
