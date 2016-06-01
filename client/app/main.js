"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
var angular2_jwt_1 = require("angular2-jwt");
var user_service_1 = require("./user/services/user.service");
var refresh_token_service_1 = require("./user/services/refresh-token.service");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    router_deprecated_1.ROUTER_PROVIDERS,
    common_1.FORM_PROVIDERS,
    core_1.provide(angular2_jwt_1.AuthConfig, {
        useFactory: function () {
            return new angular2_jwt_1.AuthConfig();
        }
    }),
    angular2_jwt_1.AuthHttp,
    refresh_token_service_1.RefreshTokenService,
    user_service_1.UserService
]);

//# sourceMappingURL=main.js.map
