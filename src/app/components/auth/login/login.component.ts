
import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { lastValueFrom } from 'rxjs'; 
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from '../email-input/email-input.component';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { Router } from '@angular/router'; // Importación añadida
import { UsersService } from 'src/app/services/users/users.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatGridListModule,
      ReactiveFormsModule,
      CommonModule,
      EmailInputComponent,
      OtpInputComponent
]
})
export class LoginComponent {
  otpSent: boolean = false;
  userEmail: string = '';
  sessionInfo: string | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private usersService: UsersService,
    private router: Router // Inyectado
  ) {} 


  async handleEmailSubmit(email: string): Promise<void> {
    this.userEmail = email;
    this.isLoading = true;
    this.errorMessage = null;

    try {
      const response = await lastValueFrom(this.usersService.login(this.userEmail));
      this.sessionInfo = response?.session || null;

      if (this.sessionInfo) {
        this.otpSent = true;

      } else {
        throw new Error('No session info received');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      this.errorMessage = 'Error al enviar el email. Por favor intenta nuevamente.';
      this.otpSent = false;
    } finally {
      this.isLoading = false;
    }
  }


  async handleOtpSubmit(otp: string): Promise<any> {
    if (!this.sessionInfo) {
      console.error('No session info available');
      this.errorMessage = 'Error de sesión. Por favor intenta nuevamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    try {
      const result = await lastValueFrom(
        this.usersService.verifyOtp(this.userEmail, otp, this.sessionInfo)
      );
      this.router.navigate(['/solicitudes']);
      return result;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      this.errorMessage = 'Código OTP inválido. Por favor intenta nuevamente.';
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  handleBackToEmail(): void {
    this.otpSent = false;
    this.userEmail = '';
  }
}


