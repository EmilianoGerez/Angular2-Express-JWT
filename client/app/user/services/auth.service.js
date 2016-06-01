"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var angular2_jwt_1 = require("angular2-jwt");
require('rxjs/add/operator/map');
var user_service_1 = require("./user.service");
var AuthService = (function () {
    function AuthService(_http, _authHttp, _userService) {
        this._http = _http;
        this._authHttp = _authHttp;
        this._userService = _userService;
        this.baseUrl = 'https://angularjwtdemo.herokuapp.com/api/auth/';
        this._headers = new http_1.Headers();
        this._jwtHelper = new angular2_jwt_1.JwtHelper();
        this._headers.append('Content-Type', 'application/json');
    }
    // Auth methods
    //////////////////////
    AuthService.prototype.login = function (credentials) {
        return this._http
            .post(this.getUrl('login'), JSON.stringify(credentials), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.activate = function (code) {
        return this._http
            .post(this.getUrl('activation'), JSON.stringify(code), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.sendActivation = function (email) {
        return this._http
            .post(this.getUrl('sendactivation'), JSON.stringify(email), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.logout = function () {
        var id = this._userService.getCurrentUser()._id;
        this._authHttp.get(this.getUrl('logout/' + id + '/null'))
            .subscribe(function () {
            localStorage.removeItem('id_token');
            localStorage.removeItem('currentUser');
        });
    };
    AuthService.prototype.closeSession = function (sessionId) {
        var userId = this._userService.getCurrentUser()._id;
        return this._authHttp
            .get(this.getUrl('logout/' + userId + '/' + sessionId))
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.forgot = function (email) {
        return this._http
            .post(this.getUrl('forgot'), JSON.stringify(email), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.resetPassword = function (reset) {
        return this._http
            .post(this.getUrl('reset'), JSON.stringify(reset), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    // Helpers methods
    ////////////////////////
    AuthService.prototype.isLoggedIn = function () {
        var token = localStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        return true;
    };
    AuthService.prototype.getUrl = function (path) {
        return this.baseUrl + path;
    };
    AuthService.prototype.getTokenData = function () {
        var token = localStorage.getItem('id_token');
        if (!token) {
            return;
        }
        return this._jwtHelper.decodeToken(token);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, user_service_1.UserService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
