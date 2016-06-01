"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var private_route_class_1 = require("../../shared/classes/private-route.class");
var router_deprecated_1 = require('@angular/router-deprecated');
var user_service_1 = require("../services/user.service");
var user_model_1 = require("../models/user.model");
var profile_data_component_1 = require("./partials/profile-data.component");
var session_list_component_1 = require("./partials/session-list.component");
var UserProfileComponent = (function (_super) {
    __extends(UserProfileComponent, _super);
    function UserProfileComponent(router, _routeParams, _userService) {
        _super.call(this, router);
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this.user = new user_model_1.User();
        this.profileSection = 'Profile';
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        // check for id param or if the id belongs to the current user
        if (id !== this._userService.getCurrentUser()._id) {
            return this.router.navigateByUrl('/home');
        }
        this._userService.getOne(id)
            .subscribe(function (user) { return _this.user = user; });
    };
    UserProfileComponent.prototype.setSection = function (name) {
        this.profileSection = name;
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'user-profile',
            templateUrl: './app/user/templates/user-profile.template.html',
            directives: [profile_data_component_1.ProfileDataComponent, session_list_component_1.SessionListComponent]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, router_deprecated_1.RouteParams, user_service_1.UserService])
    ], UserProfileComponent);
    return UserProfileComponent;
}(private_route_class_1.PrivateComponent));
exports.UserProfileComponent = UserProfileComponent;

//# sourceMappingURL=user-profile.component.js.map
