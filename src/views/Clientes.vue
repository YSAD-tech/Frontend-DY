
<template>
    <div>
      <q-table
        title="Datos usuarios"
  
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-imagen="props">
          <q-td :props="props" class="q-pa-sm">
            <img :src="props.row.imagen" alt="" style="height: 50px; width: 50px;">
  
          </q-td>
        </template>
        <template v-slot:body-cell-fecha="props">
          <q-td :props="props" class="q-pa-sm">
  
            {{ props.row.creationAt.toString().split('T')[0] }}
          </q-td>
        </template>
        <template v-slot:body-cell-estado="props">
          <q-td :props="props" class="q-pa-sm">
            <span style="background-color: green;" v-if="props.row.estado==1"><button class="activo">✅Activo✅</button></span>
            <span style="background-color: red;" v-else><button class="inactivo">❌Inactivo❌</button> </span>
  
          </q-td>
        </template>
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pa-sm">
  
           <button>📝</button>
           <button v-if="props.row.status==1">❌</button>
           <button v-else>✅</button>
  
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import {useAuthStore} from '../store/useAuth.js';
  import { getData } from "../services/apiClient.js";
  const mainStore = useStore();
  const rows = ref([
  
      
  ])
  
  
  
  let columns = ref([
    {
      name: "nombre",
      align: "center",
      label: "Nombre",
      field: "nombre",
      sortable: true,
    },
    {
      name: "identificacion",
      align: "center",
      label: "Identificacion",
      field: "identificacion",
      sortable: true,
    },
    {
      name: "direccion",
      align: "center",
      label: "Direccion",
      field: "direccion",
      
    },
    {
      name: "telefono",
      align: "center",
      label: "Telefono",
      field: "telefono",
      
    },
    {
      name: "estado",
      align: "center",
      label: "Estado",
      field: "estado",
      
    },
    
   
    {
      name: "opciones",
      align: "center",
      label: "Opciones",
      
    },
    {
      name: "imagen",
      align: "center",
      label: "Imagen",
      field: "avatar",
    },
  ]);
  
  const dataClientes = async () => {
    try {
      const response = await getData("/terceros/tipos/cliente");
      if (response.clientes) {
        rows.value = response.clientes;
        
        console.log("clientes optenidos" );
      } else {
        console.log("respuesta sin clientes", response);
      }
    } catch (error) {
      
      console.log("error al obtener los clientes", error.message);
    }
  };
  
  onMounted(() => {
    dataClientes();
  });
  </script>
  