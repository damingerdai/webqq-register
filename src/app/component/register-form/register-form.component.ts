import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../../domain/user';
import { HttpErrorResponse } from '@angular/common/http';

const API_ADD_USER = 'http://127.0.0.1:8080/webqq/addUser';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  user: User = new User();
  submitted: boolean;
  error: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.submitted = false;
  }

  onSubmit() {
    this.http
      .post(API_ADD_USER, this.user)
      .subscribe(
        data => {
          if (data['success'] === true) {
            this.submitted = true;
          }},
        (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            console.log('An error occurred:', error.error.message);
            this.error = error.error.message;
          } else {
            this.error = JSON.parse(error.error)['message'];
          }
          this.submitted = false;
        }
      );
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
}
