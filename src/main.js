import { createApp } from 'vue'
import VueNumberInput from '@chenfengyuan/vue-number-input';

import './index.css'
import App from './App.vue'

const app = createApp(App)
app.component(VueNumberInput.name, VueNumberInput);
app.mount('#app');

