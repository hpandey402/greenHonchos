import { createApp } from 'vue';
import './assets/main.css';
import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';

const app = createApp(App);

// Global_Components
app.component('base-card', BaseCard);
app.mount('#app');
