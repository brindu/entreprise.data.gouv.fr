import VueRouter from 'vue-router'
import Vue from 'vue'

import Homepage from "@/components/pages/Home";
import LegalNotes from "@/components/pages/LegalNotes";
import SearchResultsList from "@/components/pages/search_results/List";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage
    },
    {
      path: "/search",
      name: "search-results",
      component: SearchResultsList,
      props: (route) => ({ fullText: route.query.fullText, page: parseInt(route.query.page) })
    },
    {
      path: "/mentions_legales",
      name: "legal-notes",
      component: LegalNotes
    }
  ]
});

export default router;
