import { useState, useEffect, useCallback } from 'react';
import * as taskService from '../services/taskService';

/**
 * Hook personalizado que gestiona el estado de las tareas.
 * Expone métodos CRUD y estado de carga/error.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    const data = await taskService.createTask(taskData);
    setTasks((prev) => [data.task, ...prev]);
    return data.task;
  };

  const editTask = async (id, taskData) => {
    const data = await taskService.updateTask(id, taskData);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? data.task : t))
    );
    return data.task;
  };

  const markComplete = async (id) => {
    const data = await taskService.completeTask(id);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? data.task : t))
    );
  };

  const removeTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return { tasks, loading, error, addTask, editTask, markComplete, removeTask, refetch: fetchTasks };
}
