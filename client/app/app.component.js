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
var router_deprecated_1 = require("@angular/router-deprecated");
var router_config_1 = require("./shared/configs/router.config");
var main_menu_component_1 = require("./shared/components/menu/main-menu.component");
var refresh_token_service_1 = require("./user/services/refresh-token.service");
var AppComponent = (function () {
    function AppComponent(_refreshToken) {
    }
    AppComponent = __decorate([
        router_deprecated_1.RouteConfig(router_config_1.routes.paths),
        core_1.Component({
            selector: 'my-app',
            directives: [router_deprecated_1.RouterOutlet, main_menu_component_1.MainMenuComponent],
            templateUrl: './app/main.template.html'
        }), 
        __metadata('design:paramtypes', [refresh_token_service_1.RefreshTokenService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
