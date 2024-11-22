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
            <img
              :src="props.row.imagen"
              alt=""
              style="height: 50px; width: 50px"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-fecha="props">
          <q-td :props="props" class="q-pa-sm">
            {{ props.row.creationAt.toString().split("T")[0] }}
          </q-td>
        </template>
        <template v-slot:body-cell-estado="props">
          <q-td :props="props" class="q-pa-sm">
            <span style="background-color: green" v-if="props.row.estado == 1"
              ><button class="activo">✅Activo✅</button></span
            >
            <span style="background-color: red" v-else
              ><button class="inactivo">❌Inactivo❌</button>
            </span>
          </q-td>
        </template>
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pa-sm">
            <button @click="card = true">📝</button>
            <button v-if="props.row.estado == 1">❌</button>
            <button v-else>✅</button>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="card">
      <q-card class="my-card">
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="min-width: 400px">
      
  
            <q-field
              color="orange"
              standout
              bottom-slots
              :model-value="text"
              label="Nombre"
              stack-label
              counter
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ rows.nombre }}
                </div>
              </template>
              <template v-slot:append>
                <q-icon name="favorite" />
              </template>
  
              <template v-slot:hint> Field hint </template>
            </q-field>
  
                      <q-field
              color="orange"
              standout
              bottom-slots
              :model-value="text"
              label="Identificacion"
              stack-label
              counter
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ text }}
                </div>
              </template>
              <template v-slot:append>
                <q-icon name="favorite" />
              </template>
  
              <template v-slot:hint> Field hint </template>
            </q-field>
  
                      <q-field
              color="orange"
              standout
              bottom-slots
              :model-value="text"
              label="Direccion"
              stack-label
              counter
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ text }}
                </div>
              </template>
              <template v-slot:append>
                <q-icon name="favorite" />
              </template>
  
              <template v-slot:hint> Field hint </template>
            </q-field>
  
                      <q-field
              color="orange"
              standout
              bottom-slots
              :model-value="text"
              label="Telefono"
              stack-label
              counter
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ text }}
                </div>
              </template>
              <template v-slot:append>
                <q-icon name="favorite" />
              </template>
  
              <template v-slot:hint> Field hint </template>
            </q-field>
  
                      <q-field
              color="orange"
              standout
              bottom-slots
              :model-value="text"
              label="Estado"
              stack-label
              counter
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="place" />
              </template>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ text }}
                </div>
              </template>
              <template v-slot:append>
                <q-icon name="favorite" />
              </template>
  
              <template v-slot:hint> Field hint </template>
            </q-field>
  
            
          </div>
        </div>
  
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  <script setup>
  import { onMounted, ref } from "vue";
  
  const card = ref(false);
  let text = ref("Field content")
  import {useAuthStore} from '../store/useAuth.js';
  import { getData } from "../services/apiClient.js";
  const mainStore = useStore();
  const rows = ref([]);
  
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
  
  const dataProveedor = async () => {
    try {
      const response = await getData("/terceros/tipos/proveedor");
      if (response.proveedores) {
        rows.value = response.proveedores;
  
        console.log("proveedores optenidos");
      } else {
        console.log("respuesta sin proveedores", response);
      }
    } catch (error) {
      console.log("error al obtener los proveedores", error.message);
    }
  };
  
  onMounted(() => {
    dataProveedor();
  });
  </script>