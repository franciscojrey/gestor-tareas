import { useTasksStore } from './useTasksStore';

describe('useTasksStore', () => {
  beforeEach(() => {
    useTasksStore.setState({ tareas: [] });
  });

  it('agregarTarea suma una tarea al estado', () => {
    useTasksStore.getState().agregarTarea('Comprar pan');
    const { tareas } = useTasksStore.getState();
    expect(tareas).toHaveLength(1);
    expect(tareas[0].titulo).toBe('Comprar pan');
    expect(tareas[0].completada).toBe(false);
  });

  it('alternarCompletada cambia el estado de completada', () => {
    useTasksStore.getState().agregarTarea('Estudiar');
    const id = useTasksStore.getState().tareas[0].id;

    useTasksStore.getState().alternarCompletada(id);
    expect(useTasksStore.getState().tareas[0].completada).toBe(true);

    useTasksStore.getState().alternarCompletada(id);
    expect(useTasksStore.getState().tareas[0].completada).toBe(false);
  });

  it('actualizarTarea mergea cambios en la tarea', () => {
    useTasksStore.getState().agregarTarea('Tarea con foto');
    const id = useTasksStore.getState().tareas[0].id;

    useTasksStore.getState().actualizarTarea(id, { foto: 'file://foto.jpg' });
    expect(useTasksStore.getState().tareas[0].foto).toBe('file://foto.jpg');
  });
});