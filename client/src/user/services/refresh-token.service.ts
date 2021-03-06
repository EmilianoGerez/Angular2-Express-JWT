import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import {Router} from '@angular/router-deprecated';
import {Scheduler} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {JwtHelper, AuthHttp} from "angular2-jwt";


@Injectable()

export class RefreshTokenService {
  private url = 'https://angularjwtdemo.herokuapp.com/api/auth/refresh';
  private _headers:Headers = new Headers();
  private _jwtHelper:JwtHelper = new JwtHelper();

  constructor(private _http:Http,
              private _authHttp:AuthHttp,
              private _router:Router) {
    let token = localStorage.getItem('id_token');
    if (token) {
      this.scheduleRefresh();
    }

  }

  scheduleRefresh() {
    this._authHttp.tokenStream.subscribe(
      token => {
        let now:number = new Date().valueOf();
        let jwtExp = this._jwtHelper.decodeToken(token).exp;
        let exp = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay = exp.valueOf() - now;

        let queueRefresh = Scheduler.queue;

        queueRefresh.schedule(() => {
          this.refreshToken();
        }, delay);
      });
  }

  refreshToken() {
    let token = localStorage.getItem('id_token');
    // TODO check if token is present
    this._headers.set('Authorization', token);
    // TODO logout on error expired session
    return this._http.get(this.url, {headers: this._headers})
      .map(res => res.json())
      .subscribe(
        data => {
          localStorage.setItem('id_token', data.token);
          this.scheduleRefresh();
        },
        err => {
          localStorage.removeItem('id_token');
          localStorage.removeItem('currentUser');
          this._router.navigateByUrl('/login');
        });
  }
}
