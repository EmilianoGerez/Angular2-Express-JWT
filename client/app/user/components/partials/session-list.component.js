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
var user_model_1 = require("../../models/user.model");
var auth_service_1 = require("../../services/auth.service");
var SessionListComponent = (function () {
    function SessionListComponent(_authService) {
        this._authService = _authService;
        this.isClosing = false;
    }
    SessionListComponent.prototype.closeSession = function (selectedSession) {
        var _this = this;
        this.isClosing = true;
        var sessionId = selectedSession._id;
        this._authService.closeSession(sessionId)
            .subscribe(function (req) {
            _this.isClosing = false;
            _this.closeSuccess(sessionId);
        }, function (err) { return _this.setError(err); });
    };
    SessionListComponent.prototype.setError = function (err) {
        this.errorMsg = {
            head: 'Oops!!',
            msg: 'something went wrong.'
        };
    };
    SessionListComponent.prototype.closeSuccess = function (sessionId) {
        var sessions = this.userData.sessions;
        sessions = sessions.filter(function (session) {
            return session._id !== sessionId;
        });
        this.userData.sessions = sessions;
        this.successMsg = {
            head: 'Session closed!!',
            msg: ''
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_model_1.User)
    ], SessionListComponent.prototype, "userData", void 0);
    SessionListComponent = __decorate([
        core_1.Component({
            selector: 'session-list',
            templateUrl: './app/user/templates/session-list.template.html',
            providers: [auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], SessionListComponent);
    return SessionListComponent;
}());
exports.SessionListComponent = SessionListComponent;

//# sourceMappingURL=session-list.component.js.map
