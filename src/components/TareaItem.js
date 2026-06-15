import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TareaItem({ tarea, onToggle, onEliminar }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.izquierda} onPress={onToggle}>
        <View style={[styles.check, tarea.completada && styles.checkOn]}>
          {tarea.completada && <Text style={styles.tilde}>✓</Text>}
        </View>
        <Text style={[styles.titulo, tarea.completada && styles.tachado]}>
          {tarea.titulo}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onEliminar}>
        <Text style={styles.borrar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  izquierda: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  check: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: '#2563eb',
    alignItems: 'center', justifyContent: 'center',
  },
  checkOn: { backgroundColor: '#2563eb' },
  tilde: { color: '#fff', fontWeight: 'bold' },
  titulo: { fontSize: 16, flexShrink: 1 },
  tachado: { textDecorationLine: 'line-through', color: '#9ca3af' },
  borrar: { fontSize: 20, paddingLeft: 8 },
});