<template>
    <q-layout>
    <q-page-container>
    <q-page class="flex flex-center">
      <q-card class="my-card" bordered>
        <div class="header-login">
            <p>LOG IN DY 📦</p>
        </div>
        <br>
            <h6>Iniciar Sesión</h6>
         <hr>
         <br>
        <div class="login-form" :class="{'fade-in': showForm}">
            <q-card-section class="q-pa-none">
          <div class="q-gutter-md">
            <q-input
            outlined
              v-model="email"
              label="Email"
              type="email"
              dense
              autofocus
              :rules="[
                val => val && val.length > 0 || 'El email es obligatorio',
                val => /.+@.+\..+/.test(val) || 'El email es inválido'
                ]"
            />
            <q-input
            outlined
              v-model="password"
              label="Contraseña"
              type="password"
              dense
              :rules="[val => val && val.length > 0 || 'La contraseña es obligatoria']"
              :error="passwordError !== ''"
              :error-message="passwordError"
            />
          </div>
        </q-card-section>
        <br><br>
        <q-card-actions id="buttom">
          <q-btn @click="login" label="Iniciar Sesión"  />
        </q-card-actions> 
        </div>
        
      </q-card>
    </q-page>
    </q-page-container>
    </q-layout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { postData } from '../services/apiClient.js';
  import { useRouter } from 'vue-router';
  import {useAuthStore} from '../store/useAuth.js';

  
  
  const email = ref('');
  const password = ref('');   
  const passwordError = ref('');  
  const router = useRouter();
  const showForm = ref(false);  
  const authStore = useAuthStore();
  
  onMounted(() => {
    showForm.value = true;
  })
  
  const login = async () => {
    try {

      const response = await postData('/login', { email: email.value, password: password.value });
      const token = response.token;
      console.log('Token recibido:', response);
      
      if (token) {
       authStore.token = response.token;
        console.log('Token guardado:', authStore.token);
        router.replace("/home");
      } else {
        console.log('Respuesta sin token:', response);
      }
    } catch (error) {
      
      if (error.response && error.response.data.error === 'Contraseña incorrecta') {
        passwordError.value = 'La contraseña es incorrecta';  
      } else {
        console.log('Error al iniciar sesión:', error.response?.data?.error || error.message);
        passwordError.value = '';
      }
    }
  };

  </script>
  
  <style scoped>
  *{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
  }
  .q-page {
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .my-card {
    width: 400px;
    border: 1px solid ;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding-bottom: 15px;

  }

  .header-login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: rgb(0, 60, 100);
    font-size: 35px;
    color: white;
    border-radius: 12px 12px 0 0;
    font-weight: 500;
  

  }
  hr{
    width: 50%;
    border: 1px solid;
    border-radius: 50%;
  }

  
  .login-form {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.login-form.fade-in {
  opacity: 1;
}
  

  .img-login{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 17px;
    
  }

  h6{
    margin: 3px 50px;
    text-align: center;
   
   
  }
  
  .q-input {
    border-radius: 8px;
    padding: 20px 40px 0px;
    
    
  }
  
  .q-btn {
    border-radius: 8px;
    display: flex;
    
    margin: 20px 30px 5px;
    background-color: rgb(0, 60, 100);
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 
    

   
  }
  #buttom{
    display: flex;
    justify-content: center;
  }
  
  .q-card-actions {
    padding: 10px 0;
    margin: 40px;
   
  }
  </style>