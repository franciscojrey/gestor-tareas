import AsyncStorage from '@react-native-async-storage/async-storage';

const TAREAS_KEY = '@tareas';

export async function obtenerTareas() {
  const json = await AsyncStorage.getItem(TAREAS_KEY);
  return json != null ? JSON.parse(json) : [];
}

export async function guardarTareas(tareas) {
  await AsyncStorage.setItem(TAREAS_KEY, JSON.stringify(tareas));
}