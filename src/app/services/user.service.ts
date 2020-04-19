import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Observable<User> = new Observable<User>();
  
  constructor(private http: HttpClient) {}

  login(email:string, pass:string){
    var tempUser = new User();
    tempUser.email = email;
    tempUser.password = pass;
    this.user = this.http.post<User>(environment.apiURL+'user/login', tempUser).pipe( 
      tap(_ => console.log("trying to login with "+tempUser.email))
    );
  }

  getUser(){
    return this.user;
  }

  
}
