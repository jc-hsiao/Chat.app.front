import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
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
      tap(_ => console.log("fetching user data for "+tempUser.email+"...")),
      catchError(this.handleError<User>(`getUser id=${email}`,null))
    );
  }

  register(email:string, pass:string, name:string){
    var tempUser = new User();
    tempUser.displayName = name;
    tempUser.email = email;
    tempUser.password = pass;
    return this.http.post<User>(environment.apiURL+'user/create', tempUser).pipe( 
      tap(_ => console.log("signing up for "+tempUser.email+"...")),
      catchError(this.handleError<User>(`getUser id=${email}`,null))
    );    
  }

  grabAllUsers(){
    return this.http.get<User[]>(environment.apiURL+'user/all').pipe( 
      tap(_ => console.log("fetching user list..."))
    );
  }

  getUser(){
    return this.user;
  }

  grabUserById(id){
    return this.http.get<User>(environment.apiURL+'user/'+id).pipe( 
      tap(_ => console.log("fetching user list..."))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      console.error(error);   
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
