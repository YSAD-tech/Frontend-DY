<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="text-white flex flex-center">
        <q-card class="bordered-card">
          <q-card-section>
            <div class="header-login">
              <p> 📦 SING UP DY 📦</p>
            </div>
            <br />
            <h6>Crear Cuenta</h6>
            <hr />
            <div class="login-form" :class="{ 'fade-in': showForm }">
              <q-form @submit.prevent="handleSubmit" ref="formRef">
                <q-card-section>
                  <q-input v-model="form.name" label="Nombre" outlined dense color="primary"
                    class="q-mb-md bordered-input text-bold"
                    :rules="[val => !!val || 'Ingrese su nombre de usuario']" />
                  <q-input v-model="form.email" label="Email" type="email" outlined dense color="primary"
                    class="q-mt-md bordered-input text-bold"
                    :rules="[val => !!val || 'Ingrese un email valido', val => /.+@.+\..+/.test(val) || 'Email no válido']" />
                  <q-input v-model="form.password" :type="showPassword ? 'text' : 'password'" label="Contraseña"
                    outlined dense color="primary" class="q-mt-md bordered-input text-bold"
                    :rules="[val => !!val || 'Ingrese una contraseña']">
                    <template v-slot:append>
                      <q-icon :name="showPassword ? '😐' : '😑'" class="cursor-pointer"
                        @click="togglePasswordVisibility" />
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-actions id="buttom">
                  <q-btn label="Crear Cuenta" type="submit" color="primary" text-color="white" unelevated
                    class="rounded-btn" :loading="loading" :disable="loading" />
                </q-card-actions>
              </q-form>

              <q-card-section v-if="error" class="text-negative text-center q-mt-md">
                {{ error }}
              </q-card-section>
            </div>
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
.header-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: rgb(0, 60, 100);
  font-size: 35px;
  color: white;
  border-radius: 12px 12px 0 0;
  font-weight: 500;
  margin: -5% !important;
  margin-top: -6.01% !important;
}

h6 {
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  font-size: 30px;
}

.text-white {
  color: #ffffff !important;
}

.bordered-card {
  border: 1px solid #000000;
  border-radius: 13px;
}

.cursor-pointer {
  cursor: pointer;
}

#buttom{
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(0, 60, 100) !important;
}
</style>