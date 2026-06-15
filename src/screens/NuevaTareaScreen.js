import { View, Text, StyleSheet } from 'react-native';

export default function NuevaTareaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nueva Tarea</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold' },
});