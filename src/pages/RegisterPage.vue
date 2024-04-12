<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center mb-6">Registrarse</h2>
        <!-- Formulario de registro -->
        <form @submit.prevent="register">
            <!-- Campo de nombre -->
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input v-model="name" type="text" id="name" name="name"
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required>
            </div>
            <!-- Campo de apellido -->
            <div class="mb-4">
                <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido</label>
                <input v-model="lastName" type="text" id="lastName" name="lastName"
                    class="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required>
            </div>
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
            <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
            <!-- Botón de registro -->
            <button type="submit"
                class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Registrarse</button>
        </form>
        <!-- Enlace para volver al inicio de sesión -->
        <p class="text-center mt-4">¿Ya tienes una cuenta? <router-link to="/login"
                class="text-blue-500 hover:text-blue-600">Inicia sesión aquí</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

const register = async () => {
    try {
        
        const existingUser = await checkExistingUser(email.value);
        if (existingUser) {
            return; 
        }

        
        const response = await fetch('http://localhost:3002/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            })
        });

        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }

        
        router.push('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        error.value = 'Error al registrar usuario';
    }
}

const checkExistingUser = async (email) => {
    try {
        const response = await fetch(`http://localhost:3002/users?email=${email}`);
        const data = await response.json();
        if (data.length > 0) {
            error.value = 'El correo electrónico ya está registrado';
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al verificar usuario existente:', error);
        return false;
    }
}
</script>


