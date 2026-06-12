import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  CircularProgress,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useAuth } from '../context/AuthContext';
import { registerService } from '../services/authService';
import Notification from '../components/Notification';

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'error' });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setNotification({ open: true, message: 'La contraseña debe tener al menos 6 caracteres', severity: 'warning' });
      return;
    }
    setLoading(true);
    try {
      const data = await registerService(form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (error) {
      setNotification({ open: true, message: error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={2}
    >
      <Paper elevation={4} sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <TaskAltIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h5" fontWeight={700}>
            Crear cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Empieza a gestionar tus tareas hoy
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            required
            margin="normal"
            autoComplete="name"
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
            required
            margin="normal"
            autoComplete="email"
          />
          <TextField
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
            helperText="Mínimo 6 caracteres"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center">
          ¿Ya tienes cuenta?{' '}
          <Link component={RouterLink} to="/login">
            Inicia sesión
          </Link>
        </Typography>
      </Paper>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
}

export default RegisterPage;
