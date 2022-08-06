import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Countdown from 'vue3-flip-countdown'
import "element-plus/dist/index.css"
import "./assets/base.css"

const app = createApp(App);

// Add Element plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia());
app.use(ElementPlus);
app.use(Countdown);
app.use(router);

app.mount("#app");
