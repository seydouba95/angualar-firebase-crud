import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
  
  //login method

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('item', 'true');
      this.router.navigate(['dashboard']);


    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }


  //register method

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      res => {
        alert('Registration Successfull');

        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
       }
     )
  }

  //logout method 
   logout() {
    this.fireAuth.signOut().then( () => {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
  },err => {
alert(err.message);

  })
   }
  
  //sign in Google

  googleInSign() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    });
  }

}