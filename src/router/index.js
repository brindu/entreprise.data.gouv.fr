import VueRouter from 'vue-router'
import Vue from 'vue'

import Homepage from "@/components/pages/Home";
import SearchResultsList from "@/components/pages/search_results/List";

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
    },
    {
      path: "/search",
      name: "search-results",
      component: SearchResultsList,
      props: (route) => ({ fullText: route.query.fullText })
    }
  ]
});

export default router;
