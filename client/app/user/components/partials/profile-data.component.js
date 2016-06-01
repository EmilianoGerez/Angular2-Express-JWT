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
var user_service_1 = require("../../services/user.service");
var common_1 = require("@angular/common");
var user_validators_1 = require("../../classes/user.validators");
var user_model_1 = require("../../models/user.model");
var ProfileDataComponent = (function () {
    function ProfileDataComponent(fb, _userService) {
        this._userService = _userService;
        this.userData = new user_model_1.User();
        this.nameEdit = false;
        this.passEdit = false;
        this.updateNameForm = fb.group({
            firstName: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(3)
                ])],
            lastName: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(3)
                ])]
        });
        this.updatePassForm = fb.group({
            oldPassword: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(8),
                    common_1.Validators.maxLength(15)
                ])],
            password: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    common_1.Validators.minLength(8),
                    common_1.Validators.maxLength(15)
                ])],
            repassword: ['', common_1.Validators.required]
        }, { validator: user_validators_1.UserValidators.passwordMatch });
    }
    ProfileDataComponent.prototype.update = function () {
        var _this = this;
        this._userService.update(this.userData)
            .subscribe(function (res) {
            _this.nameEdit = false;
            _this.passEdit = false;
            _this.setSuccess(res);
        }, function (err) { return _this.setError(err); });
    };
    ProfileDataComponent.prototype.setError = function (err) {
        var errResponse = err.json();
        switch (errResponse.error) {
            case 'currentPassword':
                this.errorMsg = {
                    head: 'Invalid current password!!',
                    msg: 'please verify this.'
                };
                break;
            default:
                this.errorMsg = {
                    head: 'Oops!!',
                    msg: 'something went wrong.'
                };
        }
    };
    ProfileDataComponent.prototype.setSuccess = function (res) {
        switch (res.type) {
            case 'passChanged':
                this.successMsg = {
                    head: 'Password changed successfully!!',
                    msg: 'remember to use this in the next login.'
                };
                break;
            default:
                this.successMsg = {
                    head: 'User updated!!',
                    msg: 'all is ok.'
                };
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_model_1.User)
    ], ProfileDataComponent.prototype, "currentUser", void 0);
    ProfileDataComponent = __decorate([
        core_1.Component({
            selector: 'user-data',
            templateUrl: './app/user/templates/profile-data.template.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService])
    ], ProfileDataComponent);
    return ProfileDataComponent;
}());
exports.ProfileDataComponent = ProfileDataComponent;

//# sourceMappingURL=profile-data.component.js.map
