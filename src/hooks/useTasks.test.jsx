import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';
import * as taskService from '../services/taskService';

// Mock con factoría: evita cargar el módulo real (y su apiClient, que usa
// import.meta.env y no es compatible con Jest).
jest.mock('../services/taskService', () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
}));

const task1 = { _id: '1', title: 'Una', completed: false };
const task2 = { _id: '2', title: 'Dos', completed: false };

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useTasks', () => {
  it('carga las tareas al montar', async () => {
    taskService.getTasks.mockResolvedValue({ tasks: [task1, task2] });

    const { result } = renderHook(() => useTasks());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.tasks).toEqual([task1, task2]);
    expect(result.current.error).toBeNull();
  });

  it('guarda el mensaje de error si la carga falla', async () => {
    taskService.getTasks.mockRejectedValue(new Error('Sin conexión'));

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Sin conexión');
    expect(result.current.tasks).toEqual([]);
  });

  it('addTask añade la nueva tarea al principio de la lista', async () => {
    taskService.getTasks.mockResolvedValue({ tasks: [task1] });
    const nueva = { _id: '3', title: 'Tres', completed: false };
    taskService.createTask.mockResolvedValue({ task: nueva });

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addTask({ title: 'Tres' });
    });

    expect(result.current.tasks).toEqual([nueva, task1]);
  });

  it('removeTask elimina la tarea de la lista', async () => {
    taskService.getTasks.mockResolvedValue({ tasks: [task1, task2] });
    taskService.deleteTask.mockResolvedValue({});

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.removeTask('1');
    });

    expect(result.current.tasks).toEqual([task2]);
  });

  it('markComplete reemplaza la tarea por la versión completada', async () => {
    taskService.getTasks.mockResolvedValue({ tasks: [task1, task2] });
    taskService.completeTask.mockResolvedValue({ task: { ...task1, completed: true } });

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.markComplete('1');
    });

    expect(result.current.tasks[0].completed).toBe(true);
    expect(result.current.tasks[1]).toEqual(task2);
  });
});
