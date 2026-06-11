import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';

/**
 * Formulario en Dialog para crear o editar una tarea.
 * task = null → modo creación. task = objeto → modo edición.
 */
function TaskForm({ open, onClose, onSubmit, task }) {
  const [form, setForm] = useState({ title: '', description: '', responsible: '' });
  const [errors, setErrors] = useState({});

  // Cuando llega una tarea (edición), rellenar el formulario
  useEffect(() => {
    if (task) {
      setForm({ title: task.title, description: task.description || '', responsible: task.responsible });
    } else {
      setForm({ title: '', description: '', responsible: '' });
    }
    setErrors({});
  }, [task, open]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!form.responsible.trim()) newErrors.responsible = 'El responsable es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Editar tarea' : 'Nueva tarea'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Título *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            autoFocus
          />
          <TextField
            label="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Responsable *"
            value={form.responsible}
            onChange={(e) => setForm({ ...form, responsible: e.target.value })}
            error={!!errors.responsible}
            helperText={errors.responsible}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {task ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskForm;
