import { Injectable } from "@angular/core";
import { User, CustomerDetail } from "../models/customer";
import { HttpClient } from '@angular/common/http'; // Remove

@Injectable()
export class AuthService {
    user: User;
    userDetails: CustomerDetail = null;

  constructor(private http: HttpClient) { // Remove
  }

  isLoggedIn() {
    if (this.userDetails === null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    // clear local storage, navigate back to /*
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
  }

  getLoggedInUser(): User {
    const loggedUser: User = new User();
    const user = this.http.get<User>('assets/userdata.json'); // Change

    loggedUser.$key = "1";
    loggedUser.userName = "Nick";
    loggedUser.emailId = "Nick@nick.com"l;
    loggedUser.phoneNumber = "04dontcallm3";
    //loggedUser.isAdmin = user.email === "admin@gmail.com" ? true : false;
    loggedUser.isAdmin = true;

    return loggedUser;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    if (user != null) {
      if (user.isAdmin === true) {
        return true;
      }
    }
  }
}
