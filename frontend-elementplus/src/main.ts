import { createApp } from "vue";
import App from "./App.vue";
import {createPinia} from "pinia"
import axios from "axios"
import VueAxios from "vue-axios"
import router from './router'

//import "~/styles/element/index.scss";

import ElementPlus from "element-plus";
// import all element css, uncommented next line
import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.use(VueAxios, axios);
axios.defaults.baseURL = "http://localhost:8000/api";
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
//axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With,content-type';
//axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

app.provide('axios',app.config.globalProperties.axios)
app.use(router)
app.use(ElementPlus);
app.mount("#app");
