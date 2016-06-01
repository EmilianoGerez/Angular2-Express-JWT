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
var user_service_1 = require("../services/user.service");
var common_1 = require("@angular/common");
var user_validators_1 = require("../classes/user.validators");
var auth_service_1 = require("../services/auth.service");
var UserFormComponent = (function () {
    function UserFormComponent(fb, _userService) {
        this._userService = _userService;
        this.isSent = false;
        this.sending = false;
        this.userForm = fb.group({
            firstName: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(3)
                ])],
            lastName: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(3)
                ])],
            email: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    user_validators_1.UserValidators.validEmail
                ]), user_validators_1.UserValidators.emailUnique(this._userService)],
            password: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(8),
                    common_1.Validators.maxLength(15)
                ])],
            repassword: ['', common_1.Validators.required]
        }, { validator: user_validators_1.UserValidators.passwordMatch });
    }
    UserFormComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this._userService.create(form)
            .subscribe(function () {
            _this.isSent = true;
            _this.sending = false;
        }, function (err) {
            _this.setErrorMsg(err);
        });
    };
    UserFormComponent.prototype.setErrorMsg = function (err) {
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
    UserFormComponent = __decorate([
        core_1.Component({
            selector: 'user-form',
            templateUrl: './app/user/templates/user-form.template.html',
            directives: [common_1.FORM_DIRECTIVES],
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;

//# sourceMappingURL=user-form.component.js.map
