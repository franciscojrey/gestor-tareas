import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTasksStore } from '../store/useTasksStore';

export default function DetalleTareaScreen({ route, navigation }) {
  const { tareaId } = route.params;

  const tarea = useTasksStore((s) => s.tareas.find((t) => t.id === tareaId));
  const alternarCompletada = useTasksStore((s) => s.alternarCompletada);
  const eliminarTarea = useTasksStore((s) => s.eliminarTarea);

  if (!tarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.vacio}>Esta tarea ya no existe.</Text>
      </View>
    );
  }

  const handleEliminar = async () => {
    await eliminarTarea(tarea.id);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{tarea.titulo}</Text>

      <View style={styles.fila}>
        <Text style={styles.label}>Estado</Text>
        <Text style={styles.valor}>
          {tarea.completada ? '✅ Completada' : '⏳ Pendiente'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botonSec}
        onPress={() => alternarCompletada(tarea.id)}
      >
        <Text style={styles.botonSecTexto}>
          {tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonBorrar} onPress={handleEliminar}>
        <Text style={styles.botonBorrarTexto}>Eliminar tarea</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, gap: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  fila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, color: '#666' },
  valor: { fontSize: 16, fontWeight: '600' },
  botonSec: {
    borderWidth: 1, borderColor: '#2563eb', borderRadius: 8,
    padding: 12, alignItems: 'center',
  },
  botonSecTexto: { color: '#2563eb', fontSize: 15, fontWeight: '600' },
  botonBorrar: {
    backgroundColor: '#fee2e2', borderRadius: 8, padding: 14,
    alignItems: 'center', marginTop: 20,
  },
  botonBorrarTexto: { color: '#dc2626', fontSize: 15, fontWeight: '600' },
  vacio: { textAlign: 'center', color: '#9ca3af', fontSize: 16, marginTop: 40 },
});