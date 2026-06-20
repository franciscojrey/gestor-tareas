import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cancelarRecordatorio } from '../notifications/notificaciones';

export const useTasksStore = create(
  persist(
    (set, get) => ({
      tareas: [],

      agregarTarea: (titulo, notificationId = null) => {
        const nueva = {
          id: Date.now().toString(),
          titulo,
          completada: false,
          notificationId,
        };
        set({ tareas: [nueva, ...get().tareas] });
      },

      eliminarTarea: async (id) => {
        const tarea = get().tareas.find((t) => t.id === id);
        if (tarea?.notificationId) {
          try {
            await cancelarRecordatorio(tarea.notificationId);
          } catch (e) {
            console.log('No se pudo cancelar la notificación:', e);
          }
        }
        set({ tareas: get().tareas.filter((t) => t.id !== id) });
      },

      alternarCompletada: (id) => {
        set({
          tareas: get().tareas.map((t) =>
            t.id === id ? { ...t, completada: !t.completada } : t
          ),
        });
      },

      // La vamos a usar pronto para adjuntar foto, ubicación, contacto, etc.
      actualizarTarea: (id, cambios) => {
        set({
          tareas: get().tareas.map((t) =>
            t.id === id ? { ...t, ...cambios } : t
          ),
        });
      },
    }),
    {
      name: 'tareas-storage',                       // clave en AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);