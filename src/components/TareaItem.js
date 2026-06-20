import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function TareaItem({ tarea, onToggle, onAbrir, onEliminar }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle}>
        <View style={[styles.check, tarea.completada && styles.checkOn]}>
          {tarea.completada && <Text style={styles.tilde}>✓</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.centro} onPress={onAbrir}>
        {tarea.foto && <Image source={{ uri: tarea.foto }} style={styles.miniatura} />}
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
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    gap: 12,
  },
  centro: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  check: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: '#2563eb',
    alignItems: 'center', justifyContent: 'center',
  },
  checkOn: { backgroundColor: '#2563eb' },
  tilde: { color: '#fff', fontWeight: 'bold' },
  titulo: { fontSize: 16, flexShrink: 1 },
  tachado: { textDecorationLine: 'line-through', color: '#9ca3af' },
  miniatura: { width: 36, height: 36, borderRadius: 6 },
  borrar: { fontSize: 20 },
});