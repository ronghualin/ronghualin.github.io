import {createApp} from 'vue'
import App from './App.vue'
import {htmlFontSize} from "./utils/htmlFontSize"

htmlFontSize();
createApp(App).mount('#app')
