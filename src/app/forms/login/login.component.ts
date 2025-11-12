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
import { LoginService } from 'src/app/services/login-service';
import { RegisterComponent } from "../register/register.component";
import { Router } from '@angular/router';

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
  router=inject(Router);
  constantes = Constantes;
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  loginService = inject(LoginService);

  formBuilder = inject(FormBuilder);
  login = this.formBuilder.group({
    userName: [null, [Validators.required, dominioOnEmail]],
    password: [null, [Validators.required, Validators.minLength(4)]],
  });

  constructor() {}
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
          this.router.navigate(['/app/tabs/tab3']);
        }

    }

    } catch (error) {
      alert(" no se pudo iniciar sesion "+error)
    }
  }
}
