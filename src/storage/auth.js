import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIOS_KEY = '@usuarios';   
const SESION_KEY = '@sesion';

async function obtenerUsuarios() {
  const json = await AsyncStorage.getItem(USUARIOS_KEY);
  return json != null ? JSON.parse(json) : [];
}

export async function registrarUsuario(usuario, password) {
  const usuarios = await obtenerUsuarios();
  const yaExiste = usuarios.some((u) => u.usuario === usuario);
  if (yaExiste) {
    return { ok: false, error: 'El usuario ya está registrado' };
  }
  usuarios.push({ usuario, password });
  await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  return { ok: true };
}

export async function validarLogin(usuario, password) {
  const usuarios = await obtenerUsuarios();
  return usuarios.some((u) => u.usuario === usuario && u.password === password);
}

export async function guardarSesion(usuario) {
  await AsyncStorage.setItem(SESION_KEY, usuario);
}
export async function obtenerSesion() {
  return await AsyncStorage.getItem(SESION_KEY);
}
export async function cerrarSesion() {
  await AsyncStorage.removeItem(SESION_KEY);
}