import { createApp } from 'vue';
import i18n from "./i18n"
import VueNumberInput from '@chenfengyuan/vue-number-input';
import './index.css';
import App from './App.vue';

const app = createApp(App);

app.use(i18n);
app.component(VueNumberInput.name, VueNumberInput);

app.mount('#app');
