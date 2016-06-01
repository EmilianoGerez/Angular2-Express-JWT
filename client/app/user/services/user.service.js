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
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
var user_model_1 = require("../models/user.model");
var UserService = (function () {
    function UserService(_http, _authHttp) {
        this._http = _http;
        this._authHttp = _authHttp;
        this.baseUrl = 'http://localhost:3000/api/users/';
        this._headers = new http_1.Headers();
        this.currentUser = new user_model_1.User();
        this._jwtHelper = new angular2_jwt_1.JwtHelper();
        this._headers.append('Content-Type', 'application/json');
        // if the user refreshing the browser, user data are lost,
        // we can get the user data from the  local storage,
        // but we need check the accuracy of the data.
        var userLocal = localStorage.getItem('currentUser');
        var token = localStorage.getItem('id_token');
        if (userLocal && token) {
            var currentUser = JSON.parse(userLocal);
            var decode = this._jwtHelper.decodeToken(token);
            if (currentUser._id !== decode._id) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('id_token');
                return;
            }
            userLocal = JSON.parse(userLocal);
            this.currentUser = userLocal;
        }
    }
    UserService.prototype.getOne = function (id) {
        return this._authHttp.get(this.getUrl(id))
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.create = function (user) {
        return this._http.post(this.baseUrl, JSON.stringify(user), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.update = function (user) {
        return this._authHttp.put(this.getUrl(this.currentUser._id), JSON.stringify(user), { headers: this._headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.delete = function (id) {
        return this._authHttp.delete(this.getUrl(id))
            .map(function (res) { return res.json(); });
    };
    // Helpers methods
    ////////////////////////
    UserService.prototype.emailVerify = function (email) {
        var _this = this;
        return email.valueChanges
            .map(function (data) { return data.toString(); })
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(function (search) { return _this._http.get(_this.getUrl('search/' + search)); });
    };
    UserService.prototype.getUrl = function (path) {
        return this.baseUrl + path;
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    UserService.prototype.setCurrentUser = function (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

//# sourceMappingURL=user.service.js.map
