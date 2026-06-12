import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from './TaskCard';

const baseTask = {
  _id: 'abc123',
  title: 'Comprar pan',
  description: 'En la panadería de la esquina',
  responsible: 'David',
  completed: false,
  createdAt: '2026-01-15T10:00:00.000Z',
};

describe('TaskCard', () => {
  it('muestra título, descripción y responsable', () => {
    render(<TaskCard task={baseTask} onComplete={() => {}} onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText('Comprar pan')).toBeInTheDocument();
    expect(screen.getByText('En la panadería de la esquina')).toBeInTheDocument();
    expect(screen.getByText('David')).toBeInTheDocument();
  });

  it('muestra el chip "Pendiente" para tareas no completadas', () => {
    render(<TaskCard task={baseTask} onComplete={() => {}} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
    expect(screen.queryByText('Completada')).not.toBeInTheDocument();
  });

  it('muestra el chip "Completada" y oculta el botón de completar cuando está completada', () => {
    render(
      <TaskCard task={{ ...baseTask, completed: true }} onComplete={() => {}} onEdit={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByText('Completada')).toBeInTheDocument();
    // El icono de completar (CheckCircle) no debe renderizarse.
    expect(screen.queryByTestId('CheckCircleIcon')).not.toBeInTheDocument();
  });

  it('invoca los callbacks con el id/tarea correcto al pulsar las acciones', async () => {
    const user = userEvent.setup();
    const onComplete = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<TaskCard task={baseTask} onComplete={onComplete} onEdit={onEdit} onDelete={onDelete} />);

    // Los iconos de MUI exponen data-testid="<Nombre>Icon"; el click burbujea al IconButton.
    await user.click(screen.getByTestId('CheckCircleIcon'));
    await user.click(screen.getByTestId('EditIcon'));
    await user.click(screen.getByTestId('DeleteIcon'));

    expect(onComplete).toHaveBeenCalledWith('abc123');
    expect(onEdit).toHaveBeenCalledWith(baseTask);
    expect(onDelete).toHaveBeenCalledWith('abc123');
  });
});
