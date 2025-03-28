import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ChakraProvider } from '@chakra-ui/react';

// Create a theme (optional, you can customize colors if you like)
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChakraProvider>
);

reportWebVitals();
