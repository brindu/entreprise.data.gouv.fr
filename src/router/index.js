import VueRouter from 'vue-router'
import Vue from 'vue'

import Homepage from "@/components/pages/Home";
import LegalNotes from "@/components/pages/LegalNotes";
import DocumentationHome from "@/components/doc/Home";
import DocumentationSirene from "@/components/doc/Sirene";
import DocumentationRna from "@/components/doc/Rna";
import DocumentationRncs from "@/components/doc/Rncs";
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
      path: "/api_doc",
      name: "api-doc",
      component: DocumentationHome
    },
    {
      path: "/api_doc/sirene",
      name: "api-doc-sirene",
      component: DocumentationSirene
    },
    {
      path: "/api_doc/rna",
      name: "api-doc-rna",
      component: DocumentationRna
    },
    {
      path: "/api_doc/rncs",
      name: "api-doc-rncs",
      component: DocumentationRncs
    },
    {
      path: "/mentions_legales",
      name: "legal-notes",
      component: LegalNotes
    }
  ]
});

export default router;
