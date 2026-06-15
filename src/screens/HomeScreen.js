import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';
import TareaItem from '../components/TareaItem';

export default function HomeScreen({ navigation }) {
  const { usuario, logout } = useAuth();
  const { tareas, eliminarTarea, alternarCompletada } = useTasks();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.saludo}>Hola, {usuario}</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Salir</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TareaItem
            tarea={item}
            onToggle={() => alternarCompletada(item.id)}
            onEliminar={() => eliminarTarea(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            Todavía no tenés tareas.
          </Text>
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('NuevaTarea')}
      >
        <Text style={styles.botonTexto}>+ Nueva tarea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  saludo: { fontSize: 22, fontWeight: 'bold' },
  logout: { color: '#dc2626', fontSize: 15 },
  vacio: { textAlign: 'center', color: '#9ca3af', marginTop: 40, fontSize: 16 },
  boton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});