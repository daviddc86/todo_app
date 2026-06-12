import { createTheme } from '@mui/material/styles';

// Tema oscuro de la aplicación.
// Centraliza aquí los cambios de estilo (colores, tipografía, overrides de
// componentes) para que se apliquen de forma global vía ThemeProvider.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // Ejemplos de overrides globales — modifica/añade aquí tus cambios de CSS.
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
