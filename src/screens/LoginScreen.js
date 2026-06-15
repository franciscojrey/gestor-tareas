import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Button
        title="Ir a Registro"
        onPress={() => navigation.navigate('Registro')}
      />
      <Button
        title="Entrar (provisorio)"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
});