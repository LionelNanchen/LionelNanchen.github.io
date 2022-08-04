import { createRouter, createWebHistory } from "vue-router";
import { riddles } from "@/utils";
import HieroglyphsView from "../views/HieroglyphsView.vue"
import CatsView from "@/views/CatsView.vue";
import DoubleMemoriesView from "@/views/DoubleMemoriesView.vue";
import WorldMapView from "@/views/WorldMapView.vue";
import AxeView from "@/views/AxeView.vue";
import SouvenirView from "@/views/SouvenirView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: `/${riddles[0].id}`,
      name: riddles[0].title,
      component: HieroglyphsView,
    },
    {
      path: `/${riddles[1].id}`,
      name: riddles[1].title,
      component: DoubleMemoriesView,
    },
    {
      path: `/${riddles[2].id}`,
      name: riddles[2].title,
      component: CatsView,
    },
    {
      path: `/${riddles[3].id}`,
      name: riddles[3].title,
      component: WorldMapView,
    },
    {
      path: `/${riddles[4].id}`,
      name: riddles[4].title,
      component: AxeView,
    },
    {
      path: `/${riddles[5].id}`,
      name: riddles[5].title,
      component: SouvenirView,
    }
  ],
});

export default router;
