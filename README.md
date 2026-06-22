# Gestor de Tareas

Tecnología: React Native · Expo SDK 54

## Funcionalidades

- Autenticación local (registro e inicio de sesión) usando AsyncStorage, sin backend. No se permite el acceso a la app sin iniciar sesión.
- Navegación con React Navigation (Stack): Login, Registro, Home y Nueva Tarea.
- Gestión de tareas (CRUD): agregar, listar, marcar como completada y eliminar, con persistencia local.
- Notificaciones locales: recordatorio programable por tarea (a los X minutos).
- Componente reutilizable: `TareaItem` (ítem de la lista de tareas).
- Permisos y acceso a recursos: helper reutilizable que solicita el permiso antes de usar cada recurso y maneja los estados concedido / denegado / pendiente, mostrando un mensaje claro al usuario (con opción de abrir Ajustes si el permiso fue bloqueado).
- Cámara y galería (`expo-image-picker`): tomar una foto o elegir una imagen y asociarla a la tarea. La imagen se muestra como miniatura en la lista y completa en el detalle.
- Ubicación (`expo-location`): obtención del GPS actual con dirección aproximada (reverse geocoding), asociada a la tarea.
- Contactos (`expo-contacts`): selección de un contacto de la agenda como responsable de la tarea.
- Calendario (`expo-calendar`): creación de un evento en el calendario del dispositivo vinculado a la tarea, con selector de fecha y hora.
- Estado global con Zustand: la lista de tareas se maneja a través de un store global (`useTasksStore`) con acciones de agregar, eliminar y actualizar, y persistencia automática mediante el middleware `persist`.
- Testing con Jest + React Native Testing Library: 3 tests (componente, función de lógica y store).

---

## Stack

- React Native 0.81 · Expo SDK 54 · React 19
- React Navigation (native-stack)
- Zustand (con middleware `persist`)
- AsyncStorage
- expo-notifications, expo-image-picker, expo-location, expo-contacts, expo-calendar
- @react-native-community/datetimepicker
- Jest, jest-expo, @testing-library/react-native

---

## Cómo ejecutar la app

Requisitos previos: tener instalado Node.js (LTS) y la app Expo Go en el teléfono.

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el proyecto
npx expo start
```

Luego, escanear el código QR que aparece en la terminal:
- iOS: con la app Cámara (abre Expo Go).
- Android: desde el escáner de Expo Go.

La PC y el teléfono deben estar en la misma red Wi-Fi. Si la red bloquea la conexión, iniciar con `npx expo start --tunnel`.

---

## Cómo correr los tests

```bash
npm test
```

Se ejecutan 3 suites de pruebas:
- `TareaItem.test.js` — verifica que el componente reutilizable renderiza el título y responde a la interacción (toque).
- `formato.test.js` — verifica la función de formateo de direcciones.
- `useTasksStore.test.js` — verifica que las acciones del store global actualizan correctamente el estado.

 Nota: el proyecto fija `@testing-library/react-native@13` y `react-test-renderer@19.1.0` para mantener compatibilidad con React 19.1 (la versión incluida en Expo SDK 54).

---

## Estructura del proyecto

```
src/
├── components/      # Componentes reutilizables (TareaItem)
├── context/         # AuthContext (autenticación)
├── store/           # Store global de tareas (Zustand)
├── screens/         # Pantallas (Login, Registro, Home, NuevaTarea, DetalleTarea)
├── notifications/   # Configuración y programación de notificaciones locales
├── permissions/     # Helper de manejo de permisos
├── storage/         # Capa de AsyncStorage (auth)
└── utils/           # Funciones de lógica (formato)
```

---

## Video demo

---

## IA aplicada al desarrollo

Durante el desarrollo se utilizó un asistente de IA (Claude) como apoyo, principalmente para aprender conceptos de React Native, generar y refactorizar código, y resolver problemas de configuración.

Ejemplo de prompts utilizados:
- "Crear tests para el componente TareaItem.js"

Comparación entre el código generado y el código final:

- Código generado:

```javascript
import { render, fireEvent } from '@testing-library/react-native';
import TareaItem from './TareaItem';

describe('TareaItem', () => {
  const tarea = { id: '1', titulo: 'Estudiar', completada: false };

  it('muestra el título de la tarea', () => {
    const { getByText } = render(
      <TareaItem tarea={tarea} onToggle={() => {}} onAbrir={() => {}} onEliminar={() => {}} />
    );
    expect(getByText('Estudiar')).toBeTruthy();
  });

  it('llama a onAbrir cuando se toca el título', () => {
    const onAbrir = jest.fn();
    const { getByText } = render(
      <TareaItem tarea={tarea} onToggle={() => {}} onAbrir={onAbrir} onEliminar={() => {}} />
    );
    fireEvent.press(getByText('Estudiar'));
    expect(onAbrir).toHaveBeenCalledTimes(1);
  });
});
```

- Al código final se le agregó un test para el botón onEliminar: 

```javascript
  it('llama a onEliminar cuando se toca el botón de borrar', () => {
    const onEliminar = jest.fn();
    const { getByText } = render(
      <TareaItem tarea={tarea} onToggle={() => {}} onAbrir={() => {}} onEliminar={onEliminar} />
    );
    fireEvent.press(getByText('Borrar'));
    expect(onEliminar).toHaveBeenCalledTimes(1);
  });
  ```