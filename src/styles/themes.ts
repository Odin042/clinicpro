import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#03045E', 
    },
    secondary: {
      main: '#48cae4', 
    },
    background: {
      default: '#f5f5f5', 
    },
    text: {
      primary: '#03045E',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
});

export default theme;