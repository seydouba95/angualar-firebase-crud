import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/utils/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder,private auth : AuthService) { 

    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['',Validators.required]
})      
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.loginForm.valid) {

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.auth.login(email, password);
      
    }
  }
    googleInSign() {
    this.auth.googleInSign();
    }
}
