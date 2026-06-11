import { Snackbar, Alert } from '@mui/material';

/**
 * Componente de notificación reutilizable basado en Snackbar + Alert.
 * severity: 'success' | 'error' | 'warning' | 'info'
 */
function Notification({ open, message, severity = 'success', onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
