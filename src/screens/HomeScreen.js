import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Tareas</Text>
      <Button
        title="Nueva tarea"
        onPress={() => navigation.navigate('NuevaTarea')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
});