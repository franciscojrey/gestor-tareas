import { View, Text, StyleSheet } from 'react-native';

export default function RegistroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 28, fontWeight: 'bold' },
});