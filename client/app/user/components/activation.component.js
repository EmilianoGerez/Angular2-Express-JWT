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
var ActivationComponent = (function () {
    function ActivationComponent(fb, _authService, _params) {
        this.fb = fb;
        this._authService = _authService;
        this._params = _params;
        this.disabledInput = false;
        this.isActivated = false;
        this.sending = false;
        this.activationForm = fb.group({
            code: ['', common_1.Validators.required]
        });
    }
    ActivationComponent.prototype.ngOnInit = function () {
        var code = this._params.get('code');
        if (!code || code === 'null') {
            return;
        }
        this.disabledInput = true;
        this.codeModel = code;
    };
    ActivationComponent.prototype.onSubmit = function (formValue) {
        var _this = this;
        this.errorMsg = false;
        this.sending = true;
        this._authService.activate(formValue)
            .subscribe(function (res) {
            _this.isActivated = true;
            _this.sending = false;
        }, function (err) {
            _this.sending = false;
            _this.setError(err);
        });
    };
    ActivationComponent.prototype.setError = function (err) {
        var errResponse = err.json();
        switch (errResponse.error) {
            case 'invalidCode':
                this.errorMsg = {
                    head: 'Invalid Code!!',
                    msg: 'please verify your input code.'
                };
                break;
            case 'expiredCode':
                this.errorMsg = {
                    head: 'Expired Code!!',
                    msg: 'please send a new activation email'
                };
                break;
            default:
                this.errorMsg = {
                    head: 'Oops!!',
                    msg: 'something went wrong.'
                };
        }
    };
    ActivationComponent = __decorate([
        core_1.Component({
            selector: 'activation-form',
            templateUrl: './app/user/templates/activation-form.template.html',
            directives: [common_1.FORM_DIRECTIVES, router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, auth_service_1.AuthService, router_deprecated_1.RouteParams])
    ], ActivationComponent);
    return ActivationComponent;
}());
exports.ActivationComponent = ActivationComponent;

//# sourceMappingURL=activation.component.js.map
