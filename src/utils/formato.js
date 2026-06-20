export function formatearDireccion(lugar) {
    if (!lugar) return null;
    return [lugar.name, lugar.city, lugar.region].filter(Boolean).join(', ');
  }