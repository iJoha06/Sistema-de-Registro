import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) {}

  ngOnInit(): void {
    // Añade la clase cuando se inicia el componente
    document.body.classList.add('login-page');
  }

  ngOnDestroy(): void {
    // Quita la clase cuando se destruye el componente
    document.body.classList.remove('login-page');
  }

  login() {

    if(this.email == ''){
      alert('Porfavor ingrese el correo electronico');
      return;
    }

    if(this.password == ''){
      alert('Porfavor ingrese la contraseña');
      return;
    }

    this.auth.login(this.email,this.password);
    
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  signInWithGitHub() {
    this.auth.GitHubSignIn();
  }

}
