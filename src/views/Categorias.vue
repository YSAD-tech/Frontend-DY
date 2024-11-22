
<template>
    <div>
      <q-table
        title="CATEGORIAS"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="q-pa-sm">
            <span style="background-color: green" v-if="props.row.status == 1"
              >Activo</span
            >
            <span style="background-color: red" v-else>Inactivo</span>
          </q-td>
        </template>
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pa-sm">
            <button>📝</button>
            <button v-if="props.row.status == 1">❌</button>
            <button v-else>✅</button>
          </q-td>
        </template>
      </q-table>
    </div>

</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { getData } from "../services/apiClient.js";

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
        name: "Descripcion",
        align: "center",
        label: "Descripcion",
        field: "descripcion",
      },
      {
        name: "status",
        align: "center",
        label: "Estado",
        field: "status",
      },
      {
        name: "opciones",
        align: "center",
        label: "Opciones",
        field: "Opciones",
      }
    ]);

      const dataCategorias = async ()=>{
        try {
          const response = await getData("/categorias/categorias")
          if(response.categorias){
            rows.value = response.categorias
            console.log("categorias recibidas" + response.categorias);
          }
          else{
            console.log("no llegaron las categorias" + response);
          }
        } catch (error) {
          console.log("error al obtene articulo" + error.message);
        }
      }

      onMounted(()=>{
        dataCategorias()
      })

  </script>
