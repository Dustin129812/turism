import { Capacitor } from "@capacitor/core";


export const environment = {
  production: true,
  apiUrl: Capacitor.isNativePlatform()
    ? 'http://192.168.100.189:8080'   
    : 'http://localhost:8080',
  allowHttp: true,
  debug: true
};
