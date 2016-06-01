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
var common_1 = require("@angular/common");
var router_deprecated_1 = require('@angular/router-deprecated');
var user_validators_1 = require("../classes/user.validators");
var auth_service_1 = require("../services/auth.service");
var user_service_1 = require("../services/user.service");
var refresh_token_service_1 = require("../services/refresh-token.service");
var LoginFormComponent = (function () {
    function LoginFormComponent(fb, _authService, _userService, _refreshToken, router) {
        this._authService = _authService;
        this._userService = _userService;
        this._refreshToken = _refreshToken;
        this.router = router;
        this.loginForm = fb.group({
            email: ["", common_1.Validators.compose([
                    common_1.Validators.required,
                    user_validators_1.UserValidators.validEmail
                ])],
            password: ["", common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(2),
                    common_1.Validators.maxLength(15)
                ])]
        });
    }
    LoginFormComponent.prototype.onSubmit = function (credentials) {
        var _this = this;
        this._authService.login(credentials)
            .subscribe(function (res) {
            var user = res.user;
            localStorage.setItem('id_token', res.token);
            _this._userService.setCurrentUser(user);
            _this._refreshToken.scheduleRefresh();
            _this.router.navigateByUrl('/home');
        }, function (err) {
            var errResponse = err.json();
            _this.setError(errResponse);
            if (errResponse.error === 'activation') {
                _this.needsActivation = true;
            }
        });
    };
    LoginFormComponent.prototype.setError = function (errResponse) {
        switch (errResponse.error) {
            case 'credentials':
                this.errorMsg = {
                    head: 'Invalid email or password!!',
                    msg: 'please verify these.'
                };
                break;
            default:
                this.errorMsg = {
                    head: 'Oops!!',
                    msg: 'something went wrong.'
                };
        }
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            directives: [common_1.FORM_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES],
            templateUrl: './app/user/templates/login-form.template.html',
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService, user_service_1.UserService, refresh_token_service_1.RefreshTokenService, router_deprecated_1.Router])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;

//# sourceMappingURL=login-form.component.js.map
