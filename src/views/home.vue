<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <!-- Ícono del menú hamburguesa para abrir el drawer -->
        <q-btn flat icon="menu" @click="toggleDrawer" aria-label="Abrir Menú" />
        <q-toolbar-title>
          Mi Aplicación
        </q-toolbar-title>
        <q-btn flat label="Login" @click="handleLogin" />
        <q-btn flat label="Sign Up" @click="handleSignUp" />
      </q-toolbar>
    </q-header>

    <!-- Sidebar (Menú lateral flotante) -->
    <q-drawer v-model="drawer" show-if-above side="left" bordered :floating="true" :overlay="true">
      <q-list>
        <q-item-label header>
          Menú
        </q-item-label>
        
        <!-- Botones del menú lateral -->
        <q-item clickable to="/" exact>
          <q-item-section>
            <q-btn label="Inicio" color="primary" />
          </q-item-section>
        </q-item>
        
        <q-item clickable to="/login">
          <q-item-section>
            <q-btn label="Acerca de" color="primary" />
          </q-item-section>
        </q-item>
        
        <q-item clickable to="/articulos">
          <q-item-section>
            <q-btn label="Contacto" color="primary" />
          </q-item-section>
        </q-item>
        
        <q-item clickable to="/clientes">
          <q-item-section>
            <q-btn label="Perfil" color="primary" />
          </q-item-section>
        </q-item>

        <!-- Agregar 4 botones más -->
        <q-item clickable to="/movimientos">
          <q-item-section>
            <q-btn label="Perfil" color="primary" />
          </q-item-section>
        </q-item>
        <q-item clickable to="/proveedores">
          <q-item-section>
            <q-btn label="Perfil" color="primary" />
          </q-item-section>
        </q-item>
        <q-item clickable to="/categorias">
          <q-item-section>
            <q-btn label="Perfil" color="primary" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Página principal -->
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false, // El menú lateral inicialmente no se mostrará
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Al hacer clic en el botón, alterna la visibilidad del menú lateral
    },
    handleLogin() {
      console.log('Iniciar sesión');
    },
    handleSignUp() {
      console.log('Registrarse');
    },
    handleClick(buttonId) {
      alert(`Has hecho clic en el botón ${buttonId}`);
    }
  }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>