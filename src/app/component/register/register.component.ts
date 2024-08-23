import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) {}

  ngOnInit(): void {
    // Añade la clase cuando se inicia el componente y se destruye
    document.body.classList.add('register-page');
  }

  ngOnDestroy(): void {
    // Quita la clase cuando se destruye el componente
    document.body.classList.remove('register-page');
  }

  register() {

    if(this.email == ''){
      alert('Porfavor ingrese el correo electronico');
      return;
    }

    if(this.password == ''){
      alert('Porfavor ingrese la contraseña');
      return;
    }

    this.auth.register(this.email,this.password);
    this.email = '';
    this.password = '';

  }
}
