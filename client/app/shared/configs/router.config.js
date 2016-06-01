"use strict";
var home_component_1 = require("../../home/components/home.component");
var user_profile_component_1 = require("../../user/components/user-profile.component");
var login_form_component_1 = require("../../user/components/login-form.component");
var user_form_component_1 = require("../../user/components/user-form.component");
var activation_component_1 = require("../../user/components/activation.component");
var send_email_component_1 = require("../../user/components/send-email.component");
var reset_form_component_1 = require("../../user/components/reset-form.component");
exports.routes = {
    paths: [
        { path: '/home', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
        // user routes
        { path: '/users/:id', name: 'UserProfile', component: user_profile_component_1.UserProfileComponent },
        { path: '/login', name: 'Login', component: login_form_component_1.LoginFormComponent },
        { path: '/signup', name: 'Signup', component: user_form_component_1.UserFormComponent },
        { path: '/auth/activation/:code', name: 'Activation', component: activation_component_1.ActivationComponent },
        { path: '/auth/forgot', name: 'Forgot', component: send_email_component_1.SendEmailComponent },
        { path: '/auth/sendactivation', name: 'SendActivation', component: send_email_component_1.SendEmailComponent },
        { path: '/auth/reset/:code', name: 'Reset', component: reset_form_component_1.ResetFormComponent },
        // default route
        { path: '/*other', name: 'Other', redirectTo: ['Home'] }
    ]
};

//# sourceMappingURL=router.config.js.map
