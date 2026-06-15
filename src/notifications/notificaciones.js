import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configurarNotificaciones() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Recordatorios',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  return status === 'granted';
}

export async function programarRecordatorio(titulo, minutos) {
  const segundos = Math.max(1, Math.round(minutos * 60));

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarea pendiente',
      body: titulo,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: segundos,
    },
  });

  return id;
}

export async function cancelarRecordatorio(notificationId) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}