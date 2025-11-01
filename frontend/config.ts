// src/config.ts
import { Platform } from 'react-native';
const PORT = 3000;
export const API_URL =
  Platform.OS === 'android'
    ? `http://10.0.2.2:${PORT}/api`
    : `http://localhost:${PORT}/api`;
