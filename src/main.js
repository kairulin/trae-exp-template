import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// 在启动之前先等待注册完成

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    // 再启动拦截器（start 可不带参数）
    onUnhandledRequest: "warn",
    quiet: false,
  });
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
