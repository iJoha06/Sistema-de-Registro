import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // Metodo de Login
  login(email: string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token','true');
      

      if(res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/verify-email']);
      }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // Metodo de registro
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registro exitoso');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // Cerrar Sesion
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Algo salió mal');
    })
  }

  // Envio de correo de confirmación
  sendEmailForVerification(user: any){

    this.fireauth.currentUser.then(u => u?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verify-email']);
      }, (err: any) =>{
          alert('Algo salió mal. No puedo enviar correo al correo electrónico registrado.');
      })
  }

  // Iniciar sesión con Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

  // Iniciar sesión con GitHub
  GitHubSignIn() {
    return this.fireauth.signInWithPopup(new GithubAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }


}
