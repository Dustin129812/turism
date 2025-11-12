import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Constantes,
  correctPassword,
  dominioOnEmail,
  minAgeValidator,
  verifyPassword,
} from 'src/app/validators/formValidation';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonText,
  IonCard,
} from '@ionic/angular/standalone';
import { LoginService } from 'src/app/services/login-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    IonText,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    IonCard,
  ],
})
export class RegisterComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  loginService=inject(LoginService);
  constantes = Constantes;
  formBuilder = inject(FormBuilder);
  register = this.formBuilder.group(
    {
      name: [null, [Validators.required]],
      country: [null, [Validators.required]],
      birthdate: [null, [Validators.required, minAgeValidator(15)]],
      phone: [null, [Validators.required, Validators.pattern(/^[0-9]{9,}/)]],
      email: [null, [Validators.required, dominioOnEmail]],
      password: [null, [Validators.required, correctPassword(6, 20)]],
      confirmPassword: [null, [Validators.required]],
    },
    { validators: [verifyPassword('password', 'confirmPassword')] }
  );
  get name() {
    return this.register.controls['name'];
  }
  get country() {
    return this.register.controls['country'];
  }
  get birthdate() {
    return this.register.controls['birthdate'];
  }
  get phone() {
    return this.register.controls['phone'];
  }
  get email() {
    return this.register.controls['email'];
  }
  get password() {
    return this.register.controls['password'];
  }
  get confirmPassword() {
    return this.register.controls['confirmPassword'];
  }
  constructor() {}

  ngOnInit() {}

  async onSubmit() {
    if (this.register.valid) {
      try{
        await this.loginService.refister(this.register.value)
      alert('Usuario registrado con éxito!');
      this.closeModal.emit();
    } catch (err) {
      console.error(err);
      alert('Error al registrar usuario');
    }

    }
  }
}
