import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { dominioOnEmail, Constantes } from 'src/app/validators/formValidation';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonCard,
  IonText,
  IonCardHeader,
  IonCardTitle,
  IonCardContent, IonModal, IonToolbar, IonHeader, IonTitle, IonButtons, IonContent } from '@ionic/angular/standalone';
import { LoginService } from 'src/app/services/login.service';
import { RegisterComponent } from "../register/register.component";
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { BiometricService } from 'src/app/services/biometric.service';
import {NativeBiometric} from '@capgo/capacitor-native-biometric';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonContent, IonButtons, IonTitle, IonHeader, IonToolbar,
    IonCardTitle,
    IonCardHeader,
    IonText,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    IonCard,
    IonCardContent, IonModal, RegisterComponent],
})
export class LoginComponent implements OnInit {
  private serviceName = 'com.yavirac.deph';
  private bio = inject(BiometricService);
  private device = inject(DeviceService);
  router=inject(Router);
  constantes = Constantes;
  isModalOpen = false;
  msg='';
  credentials=false;
  async exist(){
    const creds = await NativeBiometric.getCredentials({
            server: this.serviceName
        }).catch(() => null);
        this.credentials = !!creds;

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  loginService = inject(LoginService);

  formBuilder = inject(FormBuilder);
  login = this.formBuilder.group({
    userName: [null, [Validators.required, dominioOnEmail]],
    password: [null, [Validators.required, Validators.minLength(4)]],
  });

  constructor() {
    this.exist();
  }
  ngOnInit() {}

  get userName() {
    return this.login.controls['userName'];
  }
  get password() {
    return this.login.controls['password'];
  }

  async onSubmit() {
    try {
      if (this.login.valid) {
        const response = await this.loginService.login(this.login);
        if(response){
          await this.bio.saveTokenSecure(this.login.value);
          this.router.navigate(['/app/tabs/tab3']);
        }

    }

    } catch (error) {
      alert(" no se pudo iniciar sesion "+error)
    }
  }

  async loginWithBiometrics() {
    const avail = await this.bio.isAvailable();

    if (!avail.isAvailable) {
      this.msg = 'Biometría no disponible en este dispositivo.';
      return;
    }

    const creds = await this.bio.getTokenSecure('Confirma tu identidad');

    if (creds) {

      const res = await this.loginService.login({
      userName: creds.username,
      password: creds.password
    });
    }
    if (creds) {
      await this.device.successTap('Autenticación correcta');
      this.router.navigate(['/app/tabs/tab3']);
    } else {
      await this.device.successTap('No hay token guardado o autenticación cancelada.');
    }
  }
}
