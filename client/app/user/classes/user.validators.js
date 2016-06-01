"use strict";
require('rxjs/add/operator/map');
var UserValidators = (function () {
    function UserValidators() {
    }
    UserValidators.emailUnique = function (userService) {
        return function (control) {
            return new Promise(function (resolve, reject) {
                userService.emailVerify(control)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (res) {
                    if (res.available) {
                        resolve(null);
                    }
                    else {
                        resolve({ emailUnique: true });
                    }
                }, function (err) {
                    resolve(null);
                });
            });
        };
    };
    UserValidators.validEmail = function (control) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return (re.test(control.value)) ? null : { validEmail: true };
    };
    UserValidators.passwordMatch = function (group) {
        var password = group.find('password').value;
        var repassword = group.find('repassword').value;
        if (password === '' || repassword === '') {
            return null;
        }
        if (password !== repassword) {
            return { passwordMatch: true };
        }
        return null;
    };
    return UserValidators;
}());
exports.UserValidators = UserValidators;

//# sourceMappingURL=user.validators.js.map
