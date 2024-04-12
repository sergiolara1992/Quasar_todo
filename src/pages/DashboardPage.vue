<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center mb-6">Bienvenido, {{ user.name }} {{ user.lastName }}</h2>
        <p class="text-center text-gray-600 mb-4">Correo electrónico: {{ user.email }}</p>
        <!-- Agregar enlace a la página TodoList.vue -->
        <router-link to="/todo-list" class="block text-center text-blue-500 hover:text-blue-600 mb-4">Ver Lista de
            Tareas</router-link>

        <!-- Mostrar otra información del usuario aquí -->

        <!-- Botón de cierre de sesión -->
        <button @click="logout"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Cerrar
            sesión</button>
    </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/Auth'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()

const user = store.user

const logout = () => {
    // Limpiar la información del usuario en el store de Pinia y redirigir a la página de inicio de sesión
    store.setUser(null)
    router.push('/login')
}
</script>
