import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Control} from "@angular/common";
import {User} from "../models/user.model";

@Injectable()

export class UserService {
  private baseUrl = 'https://angularjwtdemo.herokuapp.com/api/users/';
  private _headers:Headers = new Headers();
  private currentUser:User = new User();
  private _jwtHelper:JwtHelper = new JwtHelper();

  constructor(private _http:Http,
              private _authHttp:AuthHttp) {
    this._headers.append('Content-Type', 'application/json');

    // if the user refreshing the browser, user data are lost,
    // we can get the user data from the  local storage,
    // but we need check the accuracy of the data.
    let userLocal = localStorage.getItem('currentUser');
    let token = localStorage.getItem('id_token');
    if (userLocal && token) {
      let currentUser = JSON.parse(userLocal);
      let decode = this._jwtHelper.decodeToken(token);
      if (currentUser._id !== decode._id) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('id_token');
        return;
      }
      userLocal = JSON.parse(userLocal);
      this.currentUser = userLocal;
    }
  }

  getOne(id:string) {
    return this._authHttp.get(this.getUrl(id))
      .map(res => res.json());
  }

  create(user:any) {
    return this._http.post(this.baseUrl, JSON.stringify(user), {headers: this._headers})
      .map(res => res.json());
  }

  update(user:any) {
    return this._authHttp.put(this.getUrl(this.currentUser._id), JSON.stringify(user), {headers: this._headers})
      .map(res => res.json());
  }

  delete(id:string) {
    return this._authHttp.delete(this.getUrl(id))
      .map(res => res.json());
  }

// Helpers methods
////////////////////////

  emailVerify(email:Control) {
    return email.valueChanges
      .map(data => data.toString())
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(search => this._http.get(this.getUrl('search/' + search)));
  }

  getUrl(path:string) {
    return this.baseUrl + path;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user:any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }
}
