import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routing } from './app/app-routing.module';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    routing,
    importProvidersFrom(
      BrowserAnimationsModule, 
      MatDialogModule
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
  ]
})
  .catch(err => console.error(err));
