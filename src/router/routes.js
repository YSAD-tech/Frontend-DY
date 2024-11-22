import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Articulos from '../views/Articulos.vue'
import Clientes from '../views/Clientes.vue'
import Proveedores from '../views/Proveedores.vue'
import Movimientos from '../views/Movimientos.vue'
import Categorias from '../views/Categorias.vue'
import Singup from '../views/Singup.vue'
import App from '../App.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes =[
    {path:"/", component:App, children:[
        {path:"/login", component:Login},
        {path:"/singup", component:Singup}
    ]},
    {path:"/home", component:Home, children:[
        {path:"/articulos", component:Articulos},
        {path:"/clientes", component:Clientes},
        {path:"/proveedores", component:Proveedores},
        {path:"/movimientos", component:Movimientos},
        {path:"/categorias", component:Categorias},
        
    ]}
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes
})