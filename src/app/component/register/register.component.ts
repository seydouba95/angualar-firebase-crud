import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/utils/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    
    if (this.registerForm.valid) {
       
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
    // Appelez ici la méthode d'inscription de votre service AuthService
      this.auth.register(email,password);
    }
  }

}
