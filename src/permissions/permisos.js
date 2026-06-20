import { Alert, Linking } from 'react-native';

export async function pedirPermiso(requestFn, nombreRecurso) {
  const { status, canAskAgain } = await requestFn();


  if (status === 'granted') {
    return true;
  }


  if (canAskAgain) {

    Alert.alert(
      `Permiso de ${nombreRecurso}`,
      `Necesitamos acceso a ${nombreRecurso} para usar esta función.`
    );
  } else {

    Alert.alert(
      `Permiso de ${nombreRecurso} bloqueado`,
      `El acceso a ${nombreRecurso} está desactivado. Activalo desde Ajustes para usar esta función.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir Ajustes', onPress: () => Linking.openSettings() },
      ]
    );
  }

  return false;
}