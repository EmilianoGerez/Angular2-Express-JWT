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
var router_deprecated_1 = require("@angular/router-deprecated");
var auth_service_1 = require("../../../user/services/auth.service");
var user_service_1 = require("../../../user/services/user.service");
var MainMenuComponent = (function () {
    function MainMenuComponent(_router, _authService, _userService) {
        this._router = _router;
        this._authService = _authService;
        this._userService = _userService;
    }
    MainMenuComponent.prototype.isLoggedIn = function () {
        return this._authService.isLoggedIn();
    };
    MainMenuComponent.prototype.getUserData = function () {
        return this._userService.getCurrentUser();
    };
    MainMenuComponent.prototype.isCurrentRoute = function (route) {
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    };
    MainMenuComponent.prototype.logout = function () {
        return this._authService.logout();
    };
    MainMenuComponent = __decorate([
        core_1.Component({
            selector: 'main-menu',
            templateUrl: './app/shared/components/menu/main-menu.template.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, auth_service_1.AuthService, user_service_1.UserService])
    ], MainMenuComponent);
    return MainMenuComponent;
}());
exports.MainMenuComponent = MainMenuComponent;

//# sourceMappingURL=main-menu.component.js.map
