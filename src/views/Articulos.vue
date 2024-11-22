<template>
  <div class="tabla-container">
    <q-table
      title="ARTICULOS"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="q-pa-md"
      flat
      bordered
    >
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props" class="q-pa-sm">
          <img :src="props.row.imagen" alt="" class="avatar-img" />
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props" class="q-pa-sm">
          <q-btn
            :label="props.row.status === 1 ? 'Activo' : 'Inactivo'"
            :color="props.row.status === 1 ? 'green' : 'red'"
            @click="toggleStatus(props.row)"
            flat
          />
        </q-td>
      </template>

      <template v-slot:body-cell-opciones="props">
        <q-td :props="props" class="q-pa-sm">
          <q-btn
            @click="card = true; articulo = props.row"
            color="primary"
            label="Editar"
            flat
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <!-- Dialog para editar el artículo -->
  <q-dialog v-model="card">
    <q-card class="my-card">
      <div class="q-pa-md">
        <div class="q-gutter-y-md column" style="min-width: 400px">
          <q-field
            color="orange"
            standout
            bottom-slots
            label="Nombre"
            stack-label
            counter
            clearable
            :rules="[val => !!val || 'Este campo es obligatorio']"
          >
            <template v-slot:control>
              <input
                class="self-center full-width no-outline rounded-input"
                type="text"
                :value="articulo.nombre"
                @input="articulo.nombre = $event"
              />
            </template>
          </q-field>

          <q-field
            color="orange"
            standout
            bottom-slots
            label="Precio"
            stack-label
            counter
            clearable
            :rules="[val => !!val || 'Este campo es obligatorio']"
          >
            <template v-slot:control>
              <input
                class="self-center full-width no-outline rounded-input"
                type="number"
                v-model="articulo.precio"
                required
              />
            </template>
          </q-field>

          <q-field color="orange" standout bottom-slots label="Stock" stack-label counter clearable>
            <template v-slot:control>
              <input
                class="self-center full-width no-outline rounded-input"
                type="text"
                v-model="articulo.stock"
              />
            </template>
          </q-field>

          <q-field color="orange" standout bottom-slots label="Imagen" stack-label counter clearable>
            <template v-slot:control>
              <input
                class="self-center full-width no-outline rounded-input"
                type="text"
                v-model="articulo.imagen"
              />
            </template>
          </q-field>

          <q-field color="orange" standout bottom-slots label="Categoria" stack-label counter clearable>
            <template v-slot:control>
              <input
                class="self-center full-width no-outline rounded-input"
                type="text"
                v-model="articulo.categoria"
              />
            </template>
          </q-field>

          <q-field color="orange" standout bottom-slots label="Estado" stack-label counter clearable>
            <template v-slot:control>
              <input
                class="self-center full-width no-outline rounded-input"
                type="text"
                v-model="articulo.estado"
              />
            </template>
          </q-field>
        </div>
      </div>

      <q-card-actions align="right">
        <q-btn
          @click="editarArticulo(articulo._id)"
          v-close-popup
          flat
          color="primary"
          label="Guardar"
        />
        <q-btn v-close-popup flat color="primary" round icon="event" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar"; // Importamos useQuasar para acceder a las notificaciones
import {useAuthStore} from '../store/useAuth.js';
import { getData, putData } from "../services/apiClient.js";

const $q = useQuasar(); // Accedemos a Quasar para usar sus notificaciones

const mainStore = useStore();
const articulo = ref({});
const card = ref(false);

const rows = ref([]);
const columns = ref([
  { name: "nombre", align: "center", label: "Nombre", field: "nombre", sortable: true },
  { name: "precio", align: "center", label: "Precio", field: "precio", sortable: true },
  { name: "stock", align: "center", label: "Stock", field: "stock", sortable: true },
  { name: "avatar", align: "center", label: "Imagen", field: "avatar", sortable: true },
  { name: "status", align: "center", label: "Estado", field: "status", sortable: true },
  { name: "opciones", align: "center", label: "Opciones" },
]);

const dataArticulos = async () => {
  try {
    const response = await getData("/articulos/articulos");
    if (response.articulos) {
      rows.value = response.articulos;
      console.log("Articulos recibidos", response.articulos);
    } else {
      console.log("Respuesta sin artículos", response);
    }
  } catch (error) {
    console.log("Error al obtener artículos", error.message);
    $q.notify({
      type: 'negative',
      message: `Error: ${error.message}`
    });
  }
};

const toggleStatus = async (row) => {
  try {
    const newStatus = row.status === 1 ? 0 : 1;
    const response = await putData(`/articulos/articulo/${row._id}`, { status: newStatus });

    if (response.articulo) {
      row.status = newStatus;
      console.log("Estado del artículo actualizado", response.articulo);
      $q.notify({
        type: 'positive',
        message: 'Estado actualizado correctamente'
      });
    } else {
      throw new Error(response.message || 'No se pudo cambiar el estado');
    }
  } catch (error) {
    console.log("Error al cambiar el estado", error.message);
    $q.notify({
      type: 'negative',
      message: `Error: ${error.message}`
    });
  }
};

const editarArticulo = async (id) => {
  try {
    console.log("Artículo a editar", articulo.value);

    const response = await putData(`/articulos/articulo/${id}`, {
      nombre: articulo.value.nombre,
      precio: articulo.value.precio,
      stock: articulo.value.stock,
      imagen: articulo.value.imagen,
      categoria: articulo.value.categoria,
      estado: articulo.value.estado,
    });

    if (response.articulo) {
      console.log("Artículo editado", response.articulo);
      $q.notify({
        type: 'positive',
        message: 'Artículo editado correctamente'
      });
    } else {
      console.log("Error al editar el artículo", response.message);
      $q.notify({
        type: 'negative',
        message: `Error: ${response.message}`
      });
    }
  } catch (error) {
    console.log("Error al editar el artículo", error.message);
    $q.notify({
      type: 'negative',
      message: `Error: ${error.message}`
    });
  }
};

onMounted(() => {
  dataArticulos();
});
</script>

<style scoped>
/* Centrar la tabla solo en el eje horizontal */
.tabla-container {
  display: flex;
  justify-content: center; /* Centrado horizontal */
  margin-top: 50px; /* Espaciado superior */
}

.q-table {
  max-width: 1000px;
  width: 100%;
  border: 1px solid #ccc; /* Borde de la tabla */
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.q-btn {
  margin: 5px;
}

/* Estilos para los inputs redondeados */
.rounded-input {
  border-radius: 12px;
  padding: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}
</style>