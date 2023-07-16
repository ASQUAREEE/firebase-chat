import { createWebHistory, createRouter } from "vue-router"


import Chat from './components/Chat.vue'
import chat1 from './components/chat1.vue'



const routes =[
    {

    name: 'Chat',
    path: '/',
    component: Chat

},
    {

    name: 'chat1',
    path: '/chat1',
    component: chat1

},


];



const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;