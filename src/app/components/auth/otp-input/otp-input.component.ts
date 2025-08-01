import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-otp-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss'
})
export class OtpInputComponent {
  @Input() email: string | null = null;
  @Output() otpSubmitted = new EventEmitter<string>();
  @Output() backToEmail = new EventEmitter<void>();
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]] // OTP de 6 dígitos numéricos
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      this.otpSubmitted.emit(this.otpForm.value.otp);
    }
  }

  onBackToEmail(): void {
    this.backToEmail.emit();
  }
}
