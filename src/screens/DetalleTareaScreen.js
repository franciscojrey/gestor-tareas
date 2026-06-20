import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTasksStore } from '../store/useTasksStore';
import { pedirPermiso } from '../permissions/permisos';

export default function DetalleTareaScreen({ route, navigation }) {
  const { tareaId } = route.params;

  const tarea = useTasksStore((s) => s.tareas.find((t) => t.id === tareaId));
  const alternarCompletada = useTasksStore((s) => s.alternarCompletada);
  const eliminarTarea = useTasksStore((s) => s.eliminarTarea);
  const actualizarTarea = useTasksStore((s) => s.actualizarTarea);

  if (!tarea) {
    return (
      <View style={styles.container}>
        <Text style={styles.vacio}>Esta tarea ya no existe.</Text>
      </View>
    );
  }

  const handleTomarFoto = async () => {
    const ok = await pedirPermiso(
      () => ImagePicker.requestCameraPermissionsAsync(),
      'cámara'
    );
    if (!ok) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      actualizarTarea(tarea.id, { foto: result.assets[0].uri });
    }
  };

  const handleElegirGaleria = async () => {
    const ok = await pedirPermiso(
      () => ImagePicker.requestMediaLibraryPermissionsAsync(),
      'galería'
    );
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.canceled) {
      actualizarTarea(tarea.id, { foto: result.assets[0].uri });
    }
  };

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

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>Foto</Text>

        {tarea.foto ? (
          <Image source={{ uri: tarea.foto }} style={styles.foto} />
        ) : (
          <Text style={styles.placeholder}>Sin foto todavía</Text>
        )}

        <View style={styles.botonesFila}>
          <TouchableOpacity style={styles.botonChico} onPress={handleTomarFoto}>
            <Text style={styles.botonChicoTexto}>📷 Tomar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonChico} onPress={handleElegirGaleria}>
            <Text style={styles.botonChicoTexto}>🖼️ Galería</Text>
          </TouchableOpacity>
        </View>
      </View>

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

  seccion: {
    borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 16, gap: 12,
  },
  seccionTitulo: { fontSize: 18, fontWeight: 'bold' },
  placeholder: { color: '#9ca3af', fontStyle: 'italic' },
  foto: { width: '100%', height: 220, borderRadius: 10, backgroundColor: '#eee' },
  botonesFila: { flexDirection: 'row', gap: 10 },
  botonChico: {
    flex: 1, backgroundColor: '#2563eb', borderRadius: 8,
    padding: 12, alignItems: 'center',
  },
  botonChicoTexto: { color: '#fff', fontSize: 14, fontWeight: '600' },

  botonBorrar: {
    backgroundColor: '#fee2e2', borderRadius: 8, padding: 14,
    alignItems: 'center', marginTop: 20,
  },
  botonBorrarTexto: { color: '#dc2626', fontSize: 15, fontWeight: '600' },
  vacio: { textAlign: 'center', color: '#9ca3af', fontSize: 16, marginTop: 40 },
});