import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
  it('muestra el título "Nueva tarea" en modo creación', () => {
    render(<TaskForm open onClose={() => {}} onSubmit={() => {}} task={null} />);
    expect(screen.getByText('Nueva tarea')).toBeInTheDocument();
  });

  it('muestra el título "Editar tarea" y precarga los datos en modo edición', () => {
    const task = { title: 'Tarea X', description: 'desc', responsible: 'Ana' };
    render(<TaskForm open onClose={() => {}} onSubmit={() => {}} task={task} />);

    expect(screen.getByText('Editar tarea')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tarea X')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
  });

  it('no envía y muestra errores si faltan título y responsable', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<TaskForm open onClose={() => {}} onSubmit={onSubmit} task={null} />);

    await user.click(screen.getByRole('button', { name: 'Crear tarea' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El responsable es obligatorio')).toBeInTheDocument();
  });

  it('envía el formulario con los datos cuando es válido', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const onClose = jest.fn();
    render(<TaskForm open onClose={onClose} onSubmit={onSubmit} task={null} />);

    await user.type(screen.getByLabelText(/Título/), 'Comprar leche');
    await user.type(screen.getByLabelText(/Responsable/), 'David');
    await user.click(screen.getByRole('button', { name: 'Crear tarea' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Comprar leche',
      description: '',
      responsible: 'David',
    });
    // Tras un envío correcto se cierra el diálogo.
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
