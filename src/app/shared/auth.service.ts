import { Injectable } from '@angular/core';
import {  AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,private router:Router) { }

  //login method
  login(email:string,password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then(
      res =>{
localStorage.setItem('token','true');

  if (res.user?.emailVerified == true) {
    this.router.navigate(['dashboard']);

  }else{
    this.router.navigate(['/verify-email']);

  }
      },err => {
alert(err.message);
this.router.navigate(['/login']);
      }
    )
  }

  //register method 
register(email:string,password:string){
  this.fireAuth.createUserWithEmailAndPassword(email,password).then(res =>{
    alert('Registration Successfull');

     this.router.navigate(['/login']);
     this.sendEmailForVerification(res.user);
  },err => {
    alert(err.message);
    this.router.navigate(['/register']);


  }
  )
}

//sign out 
logout(){
  this.fireAuth.signOut().then( () => {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
  },err => {
alert(err.message);

  })
}

//forgot password 
forgotPassword(email: string){
 this.fireAuth.sendPasswordResetEmail(email).then( () => {
  this.router.navigate(['/verify-email']);
 },err => {
  alert('Something went wrong');
 })
}

//email verification 
sendEmailForVerification(user : any){
  user.sendEmailForVerification().then( (res : any) => {
    this.router.navigate(['/verify-email']);
  }, (err : any) =>{
    alert("Something went wrong. Not able to send mail to your email.");
  })

}

//sign in with google
googleSignIn() {
  return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(res => {

    this.router.navigate(['/dashboard']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));

  }, err => {
    alert(err.message);
  })
}

}
