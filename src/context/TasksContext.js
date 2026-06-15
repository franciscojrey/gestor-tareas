import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerTareas, guardarTareas } from '../storage/tareas';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    (async () => {
      const guardadas = await obtenerTareas();
      setTareas(guardadas);
    })();
  }, []);

  const agregarTarea = async (titulo) => {
    const nueva = {
      id: Date.now().toString(),
      titulo,
      completada: false,
    };
    const actualizadas = [nueva, ...tareas];
    setTareas(actualizadas);
    await guardarTareas(actualizadas);
  };

  const eliminarTarea = async (id) => {
    const actualizadas = tareas.filter((t) => t.id !== id);
    setTareas(actualizadas);
    await guardarTareas(actualizadas);
  };

  const alternarCompletada = async (id) => {
    const actualizadas = tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    setTareas(actualizadas);
    await guardarTareas(actualizadas);
  };

  return (
    <TasksContext.Provider
      value={{ tareas, agregarTarea, eliminarTarea, alternarCompletada }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}