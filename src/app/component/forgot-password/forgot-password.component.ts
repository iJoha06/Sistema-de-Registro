import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    // Añade la clase cuando se inicia el componente
    document.body.classList.add('forgot-password-page');
  }

  ngOnDestroy(): void {
    // Quita la clase cuando se destruye el componente
    document.body.classList.remove('forgot-password-page');
  }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }

}
