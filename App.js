import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

import { configurarNotificaciones } from './src/notifications/notificaciones';
import { TasksProvider } from './src/context/TasksContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import HomeScreen from './src/screens/HomeScreen';
import NuevaTareaScreen from './src/screens/NuevaTareaScreen';

const Stack = createNativeStackNavigator();

function Navegacion() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {usuario == null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
          <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Crear cuenta' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mis Tareas' }} />
          <Stack.Screen name="NuevaTarea" component={NuevaTareaScreen} options={{ title: 'Nueva Tarea' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    configurarNotificaciones();
  }, []);

  return (
    <AuthProvider>
      <TasksProvider>
        <NavigationContainer>
          <Navegacion />
        </NavigationContainer>
      </TasksProvider>
    </AuthProvider>
  );
}