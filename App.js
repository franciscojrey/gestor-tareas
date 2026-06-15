import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import HomeScreen from './src/screens/HomeScreen';
import NuevaTareaScreen from './src/screens/NuevaTareaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mis Tareas' }} />
        <Stack.Screen name="NuevaTarea" component={NuevaTareaScreen} options={{ title: 'Nueva Tarea' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}