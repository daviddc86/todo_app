import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

/**
 * Card que muestra una tarea individual con sus acciones.
 */
function TaskCard({ task, onComplete, onEdit, onDelete }) {
  return (
    <Card
      elevation={2}
      sx={{
        opacity: task.completed ? 0.7 : 1,
        borderLeft: 4,
        borderColor: task.completed ? 'success.main' : 'primary.main',
        transition: 'all 0.2s',
        '&:hover': { elevation: 4, transform: 'translateY(-2px)' },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography
            variant="h6"
            sx={{
              color: task.completed ? 'text.secondary' : 'text.primary',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {task.title}
          </Typography>
          <Chip
            label={task.completed ? 'Completada' : 'Pendiente'}
            color={task.completed ? 'success' : 'warning'}
            size="small"
          />
        </Box>

        {task.description && (
          <Typography variant="body2" color="text.secondary" mb={1}>
            {task.description}
          </Typography>
        )}

        <Box display="flex" alignItems="center" gap={0.5}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {task.responsible}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.disabled" display="block" mt={0.5}>
          {new Date(task.createdAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Typography>
      </CardContent>

      <CardActions sx={{ pt: 0, justifyContent: 'flex-end' }}>
        {!task.completed && (
          <Tooltip title="Marcar como completada">
            <IconButton color="success" size="small" onClick={() => onComplete(task._id)}>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Editar">
          <IconButton color="primary" size="small" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton color="error" size="small" onClick={() => onDelete(task._id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
