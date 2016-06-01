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
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var angular2_jwt_1 = require("angular2-jwt");
var RefreshTokenService = (function () {
    function RefreshTokenService(_http, _authHttp, _router) {
        this._http = _http;
        this._authHttp = _authHttp;
        this._router = _router;
        this.url = 'https://localhost:3000/api/auth/refresh';
        this._headers = new http_1.Headers();
        this._jwtHelper = new angular2_jwt_1.JwtHelper();
        var token = localStorage.getItem('id_token');
        if (token) {
            this.scheduleRefresh();
        }
    }
    RefreshTokenService.prototype.scheduleRefresh = function () {
        var _this = this;
        this._authHttp.tokenStream.subscribe(function (token) {
            var now = new Date().valueOf();
            var jwtExp = _this._jwtHelper.decodeToken(token).exp;
            var exp = new Date(0);
            exp.setUTCSeconds(jwtExp);
            var delay = exp.valueOf() - now;
            var queueRefresh = Rx_1.Scheduler.queue;
            queueRefresh.schedule(function () {
                _this.refreshToken();
            }, delay);
        });
    };
    RefreshTokenService.prototype.refreshToken = function () {
        var _this = this;
        var token = localStorage.getItem('id_token');
        // TODO check if token is present
        this._headers.set('Authorization', token);
        // TODO logout on error expired session
        return this._http.get(this.url, { headers: this._headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            localStorage.setItem('id_token', data.token);
            _this.scheduleRefresh();
        }, function (err) {
            localStorage.removeItem('id_token');
            localStorage.removeItem('currentUser');
            _this._router.navigateByUrl('/login');
        });
    };
    RefreshTokenService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, router_deprecated_1.Router])
    ], RefreshTokenService);
    return RefreshTokenService;
}());
exports.RefreshTokenService = RefreshTokenService;

//# sourceMappingURL=refresh-token.service.js.map
