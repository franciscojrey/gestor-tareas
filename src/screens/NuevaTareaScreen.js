import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTasks } from '../context/TasksContext';

export default function NuevaTareaScreen({ navigation }) {
  const { agregarTarea } = useTasks();
  const [titulo, setTitulo] = useState('');

  const handleGuardar = async () => {
    if (titulo.trim() === '') {
      Alert.alert('Falta el título', 'Escribí un título para la tarea');
      return;
    }
    await agregarTarea(titulo.trim());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        autoFocus
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