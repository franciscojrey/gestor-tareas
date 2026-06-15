import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { usuario, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Hola, {usuario} 👋</Text>
      <Text style={styles.subtitulo}>Acá van a aparecer tus tareas</Text>

      <Button title="Nueva tarea" onPress={() => navigation.navigate('NuevaTarea')} />

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  titulo: { fontSize: 26, fontWeight: 'bold' },
  subtitulo: { fontSize: 15, color: '#666', marginBottom: 8 },
  logout: { marginTop: 20 },
  logoutTexto: { color: '#dc2626', fontSize: 16 },
});