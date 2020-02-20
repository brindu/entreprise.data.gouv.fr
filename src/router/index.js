import VueRouter from 'vue-router'
import Vue from 'vue'

import Homepage from "@/components/Homepage";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    //{
    //  path: "/account/confirm",
    //  name: "account-confirmation",
    //  component: AccountConfirmation
    //},
    //{
    //  path: "/account/password_reset_request",
    //  name: "account-password-reset-request",
    //  component: PasswordResetRequest
    //}
    {
      path: "/",
      name: "home",
      component: Homepage
    }
  ]
});

export default router;
