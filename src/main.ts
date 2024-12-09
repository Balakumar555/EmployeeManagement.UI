import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import for animations
import { provideToastr, GlobalConfig } from 'ngx-toastr'; // Import Toastr

const toastrConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-top-right', // Position of the toast
  timeOut: 7000, // Duration before the toast disappears
  preventDuplicates: true, // Prevent duplicate toasts
  //closeButton: true,
};
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provide the router
    provideHttpClient(), // Provide the HTTP client
    provideAnimations(), // Provide animations
    provideToastr(toastrConfig) // Provide Toastr with configuration
  ]
})
.catch(err => console.error(err));