import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  register() {
    if (this.registerForm.status == 'VALID') {
      this.authService.signUp(this.registerForm.value).subscribe(
        res => {
          //console.log(res);
         // this.notification.showNotification('Congridulation ! You are now registred \n Please check your mail to confirme your registration', 'success', 'top', 'right')
          this.close()
        },

       // err => { this.notification.showNotification(err.error['text'], 'danger', 'top', 'right') }

      );
      this.registerForm.reset()
    }
  }
  close(){
    this.dialogRef.close()
  }

}
