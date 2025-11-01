import { Platform } from 'react-native';

// Usa 10.0.2.2 para Android emulator y localhost para iOS/web.
// Incluye el prefijo /api porque tu backend lo expone así.
export const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';