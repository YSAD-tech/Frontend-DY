import Login from '../views/login.vue'
import Home from '../views/Home.vue'
import Articulos from '../views/Articulos.vue'
import Clientes from '../views/Clientes.vue'
import Proveedores from '../views/Proveedores.vue'
import Movimientos from '../views/Movimientos.vue'
import Categorias from '../views/Categorias.vue'
import Singup from '../views/Singup.vue'
import MainLayout from '../layouts/MainLayout.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: "/", component: Login },
    { path: "/singup", component: Singup },
    { path: "/home", component: Home}
  ];
  

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})