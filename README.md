# Gestor de Tareas

Aplicación móvil desarrollada con React Native y Expo que permite gestionar tareas personales con autenticación local y recordatorios.

## Cómo ejecutar la app (Expo Go)

1. **Requisitos:** Node.js instalado y la app **Expo Go** en el celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)).
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```
4. **Abrir en el dispositivo:**
   - Conectar el celular y la PC a la misma red de Internet.
   - Escanear el **código QR** que aparece en la terminal o en el navegador.
   - En Android: escanear con Expo Go. En iOS: usar la cámara del iPhone y abrir con Expo Go.
5. **Notificaciones:** al crear una tarea con recordatorio, la app pedirá permiso de notificaciones. Aceptá para probar esa funcionalidad.

## Funcionalidades implementadas

### Autenticación
- Registro de usuario con validación de campos y detección de usuario duplicado
- Inicio de sesión con usuario y contraseña
- Cierre de sesión
- Sesión persistente (al reabrir la app se mantiene la sesión)

### Tareas
- Listar tareas del usuario
- Crear tarea con título
- Marcar o desmarcar tarea como completada
- Eliminar tarea
- Mensaje cuando no hay tareas

### Persistencia
- Usuarios y sesión guardados en AsyncStorage
- Tareas guardadas en AsyncStorage

### Notificaciones
- Recordatorio opcional al crear tarea (en minutos)
- Cancelación del recordatorio al eliminar la tarea

### Navegación
- Flujo condicional: Login/Registro si no hay sesión; Home/Nueva Tarea si hay sesión activa
