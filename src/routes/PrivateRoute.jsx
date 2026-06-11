import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

/**
 * Componente que protege rutas privadas.
 * Si no hay token, redirige al login.
 * Mientras carga la sesión desde localStorage, muestra un spinner.
 */
function PrivateRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
