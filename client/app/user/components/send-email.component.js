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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var auth_service_1 = require("../services/auth.service");
var user_validators_1 = require("../classes/user.validators");
var SendEmailComponent = (function () {
    function SendEmailComponent(fb, _authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.isForgot = false;
        this.isSent = false;
        this.sending = false;
        this.sendEmailForm = fb.group({
            email: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    user_validators_1.UserValidators.validEmail
                ])]
        });
    }
    SendEmailComponent.prototype.ngOnInit = function () {
        this.isForgot = this._router.root.currentInstruction.component.routeName === 'Forgot';
        this.formTitle = (this.isForgot) ? 'Reset your password' : 'Send activation account email';
        this.processName = (this.isForgot) ? 'reset password' : 'activation account';
    };
    SendEmailComponent.prototype.onSubmit = function (formValue) {
        this.errorMsg = false;
        this.sending = true;
        (this.isForgot) ? this.sendReset(formValue) : this.sendActivation(formValue);
    };
    SendEmailComponent.prototype.sendActivation = function (formValue) {
        var _this = this;
        this._authService.sendActivation(formValue)
            .subscribe(function (res) {
            _this.isSent = true;
            _this.sending = false;
        }, function (err) {
            _this.setErrorMsg(err);
        });
    };
    SendEmailComponent.prototype.sendReset = function (formValue) {
        var _this = this;
        this._authService.forgot(formValue)
            .subscribe(function (res) {
            _this.isSent = true;
            _this.sending = false;
        }, function (err) {
            _this.setErrorMsg(err);
        });
    };
    SendEmailComponent.prototype.setErrorMsg = function (err) {
        var errResponse = err.json();
        this.sending = false;
        switch (errResponse.error) {
            case 'invalidEmail':
                this.errorMsg = {
                    head: 'Invalid Email!!',
                    msg: 'please verify your input email.'
                };
                break;
            case 'sending':
                this.errorMsg = {
                    head: 'Error Sending!!',
                    msg: 'please try again'
                };
                break;
            default:
                this.errorMsg = {
                    head: 'Oops!!',
                    msg: 'something went wrong.'
                };
        }
    };
    SendEmailComponent = __decorate([
        core_1.Component({
            selector: 'sendEmail-form',
            templateUrl: './app/user/templates/send-email.template.html',
            directives: [common_1.FORM_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService, router_deprecated_1.Router])
    ], SendEmailComponent);
    return SendEmailComponent;
}());
exports.SendEmailComponent = SendEmailComponent;

//# sourceMappingURL=send-email.component.js.map
