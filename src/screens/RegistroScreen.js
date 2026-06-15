import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegistroScreen({ navigation }) {
  const { registrar } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async () => {
    if (usuario.trim() === '' || password.trim() === '') {
      Alert.alert('Faltan datos', 'Completá usuario y contraseña');
      return;
    }
    const { ok, error } = await registrar(usuario.trim(), password);
    if (ok) {
      Alert.alert('Listo', 'Usuario registrado. Ya podés iniciar sesión.');
      navigation.goBack();
    } else {
      Alert.alert('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
        <Text style={styles.botonTexto}>Registrarme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  boton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
});