import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function verifyPassword(pass: string, conf: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(pass);
    const confirm = control.get(conf);
    const passwordValue = password ?.value;
    const confirmValue = confirm ?.value;

    if (!password || !confirm) return null;
    if (!confirmValue) {
      if (confirm.hasError('required')) return null;
      confirm.setErrors(null);
      return null;
    }
    if (passwordValue !== confirmValue) {
      confirm.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    confirm.setErrors(null);
    return null;
  };
}
export function dominioOnEmail(control: AbstractControl) {
  const email = control.value;
  if (!email) return null;

  const domains = ['gmail.com', 'yavirac.edu.ec','example.com'];
  const domain = email.split('@')[1];

  if (!domain) return { domianInvalid: true };

  return domains.includes(domain) ? null : { domianInvalid: true };
}

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthdate = control.value;
    if (!birthdate) return null;

    const today = new Date();
    const birth = new Date(birthdate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age < minAge ? { minAgeInvalid: true } : null;
  };
}
export function correctPassword(min: number, max: number) {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;

    const cumpleLongitud = value.length >= min && value.length <= max;
    const tieneMayuscula = /[A-Z]/.test(value);
    const tieneNumero = /\d/.test(value);

    if (cumpleLongitud && tieneMayuscula && tieneNumero) {
      return null;
    }

    return { passwordInvalid:{ message:`Debe tener entre ${min}-${max} caracteres, una mayúscula y un número.` }};
  };
}

export class Constantes {
  static required = 'required';
  static email = 'email';
  static pattern = 'pattern';
  static passwordMismatch = 'passwordMismatch';
  static domianInvalid = 'domianInvalid';
  static passwordInvalid = 'passwordInvalid';
  static minAgeInvalid = 'minAgeInvalid';
}
