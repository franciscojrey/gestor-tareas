import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTasksStore } from '../store/useTasksStore';
import { programarRecordatorio } from '../notifications/notificaciones';

export default function NuevaTareaScreen({ navigation }) {
  const agregarTarea = useTasksStore((s) => s.agregarTarea);
  const [titulo, setTitulo] = useState('');
  const [minutos, setMinutos] = useState('');

  const handleGuardar = async () => {
    if (titulo.trim() === '') {
      Alert.alert('Falta el título', 'Escribí un título para la tarea');
      return;
    }

    let notificationId = null;
    const min = parseFloat(minutos);
    if (!isNaN(min) && min > 0) {
      notificationId = await programarRecordatorio(titulo.trim(), min);
    }

    await agregarTarea(titulo.trim(), notificationId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Estudiar React Native"
        value={titulo}
        onChangeText={setTitulo}
        autoFocus
      />

      <Text style={styles.label}>Recordarme en (minutos)</Text>
      <TextInput
        style={styles.input}
        placeholder="Minutos"
        keyboardType="numeric"
        value={minutos}
        onChangeText={setMinutos}
      />

      <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Guardar tarea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  label: { fontSize: 16, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  boton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});