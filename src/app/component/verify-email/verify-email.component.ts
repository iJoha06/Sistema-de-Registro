import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  ngOnInit(): void {
    // Añade la clase cuando se inicia el componente y se destruye
    document.body.classList.add('verify-email-page');
  }

  ngOnDestroy(): void {
    // Quita la clase cuando se destruye el componente
    document.body.classList.remove('verify-email-page');
  }

}
