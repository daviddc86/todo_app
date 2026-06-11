import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Fab,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../layouts/MainLayout';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';
import { useTasks } from '../hooks/useTasks';

function DashboardPage() {
  const { tasks, loading, error, addTask, editTask, markComplete, removeTask } = useTasks();

  // Estado del formulario
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Estado del diálogo de confirmación
  const [deleteId, setDeleteId] = useState(null);

  // Filtro de pestañas
  const [tab, setTab] = useState(0); // 0: Todas, 1: Pendientes, 2: Completadas

  // Notificación
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingTask) {
        await editTask(editingTask._id, data);
        notify('Tarea actualizada correctamente');
      } else {
        await addTask(data);
        notify('Tarea creada correctamente');
      }
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setEditingTask(null);
    }
  };

  const handleComplete = async (id) => {
    try {
      await markComplete(id);
      notify('Tarea marcada como completada ✓');
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeTask(deleteId);
      notify('Tarea eliminada');
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (tab === 1) return !t.completed;
    if (tab === 2) return t.completed;
    return true;
  });

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  if (loading) {
    return (
      <MainLayout>
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Cabecera */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Mis Tareas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''} · {completedCount} completada{completedCount !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setEditingTask(null); setFormOpen(true); }}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          Nueva tarea
        </Button>
      </Box>

      {/* Pestañas de filtro */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label={<Box display="flex" alignItems="center" gap={1}>Todas <Chip label={tasks.length} size="small" /></Box>} />
        <Tab label={<Box display="flex" alignItems="center" gap={1}>Pendientes <Chip label={pendingCount} size="small" color="warning" /></Box>} />
        <Tab label={<Box display="flex" alignItems="center" gap={1}>Completadas <Chip label={completedCount} size="small" color="success" /></Box>} />
      </Tabs>

      {/* Error */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Listado de tareas */}
      {filteredTasks.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary" variant="h6">
            No hay tareas aquí
          </Typography>
          <Typography color="text.disabled" variant="body2">
            {tab === 0 ? 'Crea tu primera tarea con el botón +' : 'Cambia el filtro para ver otras tareas'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <TaskCard
                task={task}
                onComplete={handleComplete}
                onEdit={(t) => { setEditingTask(t); setFormOpen(true); }}
                onDelete={(id) => setDeleteId(id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* FAB para móvil */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24, display: { xs: 'flex', sm: 'none' } }}
        onClick={() => { setEditingTask(null); setFormOpen(true); }}
      >
        <AddIcon />
      </Fab>

      {/* Formulario */}
      <TaskForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingTask(null); }}
        onSubmit={handleFormSubmit}
        task={editingTask}
      />

      {/* Confirmación de borrado */}
      <ConfirmDialog
        open={!!deleteId}
        title="Eliminar tarea"
        message="¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />

      {/* Notificaciones */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </MainLayout>
  );
}

export default DashboardPage;
