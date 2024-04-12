<template>
    <div class="max-w-lg mx-auto px-4 sm:px-0">
        <!-- Título -->
        <h1 class="text-3xl font-semibold text-center mb-4 mt-16">Todo List</h1>

        <!-- Formulario para agregar nuevas tareas -->
        <form @submit.prevent="addTodo" class="mb-4">
            <div class="flex flex-col sm:flex-row items-center">
                <input type="text" v-model="newTodo" placeholder="Agregar nueva tarea"
                    class="flex-1 px-4 py-2 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white mb-2 sm:mb-0 sm:mr-2" />
                <button type="submit"
                    class="px-4 py-2 rounded-r-lg bg-blue-500 text-white font-semibold border border-blue-500">Agregar</button>
            </div>
        </form>

        <!-- Botones de filtrado -->
        <div class="flex justify-center mb-4">
            <button @click="filterTodos('all')" :class="{ 'bg-blue-500 font-bold text-white': filter === 'all' }"
                class="px-4 py-2 rounded-l-lg bg-blue-500 border border-gray-300 hover:bg-blue-500 hover:text-white">
                Todas
            </button>
            <button @click="filterTodos('active')" :class="{ 'bg-blue-500 font-bold text-white': filter === 'active' }"
                class="px-4 py-2 bg-blue-500 border border-gray-300 hover:bg-blue-500 hover:text-white">
                Activas
            </button>
            <button @click="filterTodos('completed')"
                :class="{ 'bg-blue-500 font-bold text-white': filter === 'completed' }"
                class="px-4 py-2 rounded-r-lg bg-blue-500 border border-gray-300 hover:bg-blue-500 hover:text-white">
                Completadas
            </button>
        </div>

        <!-- Lista de tareas filtrada -->
        <ul class="divide-y divide-gray-200">
            <li v-for="todo in filteredTodos" :key="todo.id" class="py-2">
                <!-- Mostrar el nombre de la tarea o campo de entrada en modo de edición -->
                <template v-if="editTodoId === todo.id">
                    <div class="flex items-center">
                        <input type="text" v-model="editedTodoText" @keyup.enter="updateTodo(todo)"
                            class="flex-1 px-4 py-2 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white mb-2 sm:mb-0 sm:mr-2" />
                        <button @click="updateTodo(todo)"
                            class="px-4 py-2 rounded-r-lg bg-green-500 text-white font-semibold border border-green-500">
                            Guardar
                        </button>
                        <button @click="cancelEdit" class="px-4 py-2 bg-gray-300 text-gray-800 font-semibold">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="flex justify-between items-center">
                        <span :class="{ 'line-through': todo.completed }" class="text-gray-800">{{ todo.title }}</span>
                        <!-- Botones para acciones -->
                        <div class="flex items-center">
                            <button @click="editMode(todo)" class="text-gray-500 hover:text-blue-500 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                            <button @click="deleteTodo(todo.id)" class="text-red-500 hover:text-red-700 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <input type="checkbox" v-model="todo.completed" @change="toggleCompleted(todo)"
                                class="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded" />
                        </div>
                    </div>
                </template>
            </li>
        </ul>

        <!-- Botón de regreso al dashboard -->
        <router-link to="/dashboard" class="block text-center mt-8">
            <button class="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 mb-10">
                Volver al Dashboard
            </button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
    data() {
        return {
            todos: [],
            newTodo: '',
            editTodoId: null,
            editedTodoText: '',
            filter: 'all', 
        };
    },
    computed: {
        
        filteredTodos() {
            if (this.filter === 'active') {
                return this.todos.filter(todo => !todo.completed);
            } else if (this.filter === 'completed') {
                return this.todos.filter(todo => todo.completed);
            } else {
                return this.todos;
            }
        }
    },
    methods: {
        
        async addTodo() {
            if (this.newTodo.trim() !== '') {
                try {
                    const response = await fetch('http://localhost:3001/todos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: this.newTodo,
                            completed: false
                        })
                    });
                    const data = await response.json();
                    this.todos.push(data);
                    this.newTodo = ''; 
                } catch (error) {
                    console.error('Error al agregar la tarea:', error);
                }
            }
        },
        
        async deleteTodo(id) {
            try {
                await fetch(`http://localhost:3001/todos/${id}`, {
                    method: 'DELETE'
                });
                this.todos = this.todos.filter(todo => todo.id !== id);
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
            }
        },
        
        async toggleCompleted(todo) {
            try {
                const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: todo.completed
                    })
                });
                const data = await response.json();
                this.todos = this.todos.map(t => (t.id === todo.id ? data : t));
            } catch (error) {
                console.error('Error al actualizar la tarea:', error);
            }
        },
        
        editMode(todo) {
            this.editTodoId = todo.id;
            this.editedTodoText = todo.title;
        },
        
        cancelEdit() {
            this.editTodoId = null;
            this.editedTodoText = '';
        },
        
        async updateTodo(todo) {
            try {
                const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: this.editedTodoText
                    })
                });
                const data = await response.json();
                this.todos = this.todos.map(t => (t.id === todo.id ? data : t));
                this.editTodoId = null;
                this.editedTodoText = '';
            } catch (error) {
                console.error('Error al actualizar la tarea:', error);
            }
        },
        
        filterTodos(type) {
            this.filter = type;
        }
    },
    
    async mounted() {
        try {
            const response = await fetch('http://localhost:3001/todos');
            this.todos = await response.json();
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    }
};
</script>

<style scoped>

.line-through {
    text-decoration: line-through;
}


@media screen and (max-width: 640px) {
    .max-w-lg {
        max-width: 100%;
    }
}
</style>
