<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>
        <!-- Formulario de inicio de sesión -->
        <form @submit.prevent="login">
            <!-- Campo de correo electrónico -->
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input v-model="email" type="email" id="email" name="email"
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required>
            </div>
            <!-- Campo de contraseña -->
            <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input v-model="password" type="password" id="password" name="password"
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required>
            </div>
            <!-- Mensaje de error -->
            <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
            <!-- Botón de inicio de sesión -->
            <button type="submit"
                class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Iniciar
                sesión
            </button>
        </form>
        <!-- Enlace al registro -->
        <p class="text-center mt-4">¿No tienes una cuenta? <router-link to="/register"
                class="text-blue-500 hover:text-blue-600">Regístrate aquí</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/Auth'

const store = useAuthStore()
const usuariosRegistrado = ref([])
const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

const login = async () => {
    try {
        const response = await fetch('http://localhost:3002/users')
        const data = await response.json()
        usuariosRegistrado.value = data

        let found = false

        usuariosRegistrado.value.forEach(usuarioRegistrado => {
            if (usuarioRegistrado.email === email.value && usuarioRegistrado.password === password.value) {
                
                store.setUser(usuarioRegistrado)
                router.push('/dashboard') 
                found = true
            }
        })

        if (!found) {
            error.value = 'Correo electrónico o contraseña incorrectos.'
        } else {
            error.value = ''
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
    }
}
</script>


