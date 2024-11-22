
<template>
    <div>
      <q-table
        title="MOVIMIENTOS"
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
        
        <template v-slot:body-cell-Articulos="props">
    <q-td :props="props" class="q-pa-sm">
      <!-- Verificar si 'articulos' existe y tiene datos -->
      <ul v-if="props.row.articulos && props.row.articulos.length > 0">
        <!-- Iterar sobre cada objeto dentro del array -->
        <li v-for="(articulo, index) in props.row.articulos" :key="index">
          <!-- Mostrar las propiedades del objeto -->
          ID: {{ articulo.id }}, Cantidad: {{ articulo.cantidad }}, Precio: ${{ articulo.precio }}
        </li>
      </ul>
      <span v-else>No hay artículos</span>
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
        name: "ID",
        align: "center",
        label: "ID",
        field: "_id",
        sortable: true,
      },
      {
        name: "Tipo",
        align: "center",
        label: "Tipo",
        field: "tipo",
      },
      {
        name: "Factura",
        align: "center",
        label: "Factura",
        field: "numeroFactura",
      },
      {
        name: "Fecha",
        align: "center",
        label: "Fecha",
        field: "fecha",
      },
      {
        name:"Articulos",
        align:"center",
        label:"Articulos",
        field:"articulos"
      },
      {
        name:"Valor",
        align:"center",
        label:"Valor",
        field:"valor"
      },
      {
        name:"Iva",
        align:"center",
        label:"Iva",
        field:"iva"
      },
      {
        name:"Total",
        align:"center",
        label:"Total",
        field:"total"
      },
      {
        name:"Estado",
        align:"center",
        label:"Estado",
        field:"estado"
      }

    ]);

      
    const dataCategorias = async ()=>{
      try {
        const response =  await getData("/movimientos/movimientos")
        if(response.movimientos){
          rows.value = response.movimientos
          console.log("movimientos recivbidos" + response.value);
        }
      } catch (error) {
        console.log("no llegaron los mocimientos" + error.message);
      }
    }

      onMounted(()=>{ 
        dataCategorias()
      })

  </script>
