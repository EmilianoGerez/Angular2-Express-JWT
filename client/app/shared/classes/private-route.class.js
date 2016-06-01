"use strict";
var angular2_jwt_1 = require("angular2-jwt");
var PrivateComponent = (function () {
    function PrivateComponent(_router, role) {
        this._router = _router;
        this.role = role;
        this._jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    PrivateComponent.prototype.routerOnActivate = function (next, prev) {
        // verify is logged in
        if (!angular2_jwt_1.tokenNotExpired()) {
            this._router.navigateByUrl('/login');
        }
        else if (this.role && this.getUserRole() !== this.role) {
            this._router.navigateByUrl('/home');
        }
    };
    PrivateComponent.prototype.getUserRole = function () {
        var token = localStorage.getItem('id_token');
        if (!token) {
            return;
        }
        return this._jwtHelper.decodeToken(token).role;
    };
    return PrivateComponent;
}());
exports.PrivateComponent = PrivateComponent;

//# sourceMappingURL=private-route.class.js.map
