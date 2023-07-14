import { createWebHistory, createRouter } from "vue-router"


import Chat from './components/Chat.vue'


const routes =[{

    name: 'Chat',
    path: '/',
    component: Chat

},


];



const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;