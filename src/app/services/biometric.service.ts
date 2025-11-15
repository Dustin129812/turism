// src/app/core/biometric.service.ts
import {Injectable} from '@angular/core';
import {NativeBiometric, BiometryType} from '@capgo/capacitor-native-biometric';

@Injectable({providedIn: 'root'})
export class BiometricService {
  private serviceName = 'com.yavirac.deph';

  async isAvailable() {
    try {
      const res = await NativeBiometric.isAvailable();
      console.log('res isAvailable', res);
      return res;
    } catch {
      return {isAvailable: false} as any;
    }
  }

  async authenticate(reason = 'Autentícate con tu huella/Face ID') {
    try {
      await NativeBiometric.verifyIdentity({
        reason,
        title: 'Verificación',
        subtitle: 'Inicio de sesión',
        description: 'Usa la biometría para continuar',
        maxAttempts: 3, // iOS
      });
      return true;
    } catch {
      return false;
    }
  }

  async saveTokenSecure(user:any) {
    if (!user.userName || !user.password) return;

    await NativeBiometric.setCredentials({
      username: user.userName,
      password: user.password,
      server: this.serviceName,
    });
  }

  async getTokenSecure(prompt = 'Confirma tu identidad para desbloquear el token') {

    const existing = await NativeBiometric.getCredentials({
      server: this.serviceName
    }).catch(() => null);

    if (!existing) return null;

    const ok = await this.authenticate(prompt);
    if (!ok) return null;

    return existing;
  }

  async deleteTokenSecure() {
    await NativeBiometric.deleteCredentials({server: this.serviceName});
  }
}
