import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl=`${environment.apiUrl}/auth`;

  constructor(private http:HttpClient,private router: Router){}

async login(control: AbstractControl): Promise<boolean> {
  try {
    const email = control.get('userName')?.value;
    const password = control.get('password')?.value;
    console.log('API URL:', this.apiUrl);

    const response = await firstValueFrom(
      this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
    );

    console.log('✅ Login exitoso:', response);

    await Preferences.set({ key: 'token', value: response.token });
    localStorage.setItem('token', response.token);
    return true;

  } catch (err: any) {
    console.error('❌ Error al iniciar sesión:', err);
    alert('Error de login: ' + JSON.stringify(err.error || err.message));
    return false;
  }
}

  async refister(data:any){

    try {
      const response=await firstValueFrom(this.http.post(`${this.apiUrl}/register`,data))

    } catch (error) {
      alert("error al registrarce "+error)
    }
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  }

  async logout() {
    await Preferences.remove({ key: 'token' });
    this.router.navigate([""])
  }
}
