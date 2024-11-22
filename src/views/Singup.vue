<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page class="bg-dark text-white flex flex-center">
          <q-card class="q-pa-lg bordered-card" style="max-width: 400px; width: 100%;">
            <q-card-section>
              <div class="text-h6 text-center text-bold text-primary">Registrarse</div>
            </q-card-section>
  
            <q-form @submit.prevent="handleSubmit" ref="formRef">
              <q-card-section>
                <q-input
                  v-model="form.name"
                  label="Nombre"
                  outlined
                  dense
                  color="primary"
                  class="q-mb-md bordered-input text-bold"
                  :rules="[val => !!val || 'Ingrese su nombre de usuario']"
                />
                <q-input
                  v-model="form.email"
                  label="Email"
                  type="email"
                  outlined
                  dense
                  color="primary"
                  class="q-mt-md bordered-input text-bold"
                  :rules="[val => !!val || 'Ingrese un email valido', val => /.+@.+\..+/.test(val) || 'Invalid email']"
                />
                <q-input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Contraseña"
                  outlined
                  dense
                  color="primary"
                  class="q-mt-md bordered-input text-bold"
                  :rules="[val => !!val || 'Ingrese una contraseña']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </template>
                </q-input>
              </q-card-section>
  
              <q-card-actions align="center" class="q-mt-md">
                <q-btn
                  label="Sign Up"
                  type="submit"
                  color="primary"
                  text-color="white"
                  unelevated
                  class="rounded-btn"
                  :loading="loading"
                  :disable="loading"
                />
              </q-card-actions>
            </q-form>
  
            <q-card-section v-if="error" class="text-negative text-center q-mt-md">
              {{ error }}
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { postData } from "../services/apiClient.js";
  import { useQuasar } from "quasar";
  
  const form = ref({
    name: "",
    email: "",
    password: "",
  });
  const error = ref("");
  const loading = ref(false);
  const formRef = ref(null);
  const showPassword = ref(false); // Estado para mostrar/ocultar contraseña
  const router = useRouter();
  const $q = useQuasar();
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  const handleSubmit = async () => {
    error.value = "";
  
    if (!(await formRef.value.validate())) {
      return;
    }
  
    loading.value = true;
  
    try {
      const payload = {
        email: form.value.email,
        contraseña: form.value.password,
      };
      const response = await postData("/usuarios", payload);
  
      console.log("Usuario registrado:", response);
  
      $q.notify({
        type: "positive",
        message: `Welcome, ${form.value.name}! Su registro fue exitoso.`,
      });
  
      form.value.name = "";
      form.value.email = "";
      form.value.password = "";
      loading.value = false;
  
      // Redirige a Home después del registro
      router.push("/home");
    } catch (err) {
      console.error("Error al registrar el usuario:", err);
      error.value =
        err.response?.data?.msg || "Ocurrio un error, intentelo nuevamente.";
      $q.notify({
        type: "negative",
        message: error.value,
      });
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .bg-dark {
    background-color: #ffffff;
  }
  
  .text-white {
    color: #ffffff !important;
  }
  
  .text-bold {
    font-weight: bold !important;
  }
  
  .text-primary {
    color: #3e8ef7;
  }
  
  .bordered-input .q-field {
    border: 1px solid #3e8ef7 !important;
    border-radius: 4px;
  }
  
  .bordered-card {
    border: 1px solid #3e8ef7;
    border-radius: 10px;
  }
  
  .rounded-btn {
    border-radius: 4px;
  }
  
  .cursor-pointer {
    cursor: pointer;
  }
  </style>