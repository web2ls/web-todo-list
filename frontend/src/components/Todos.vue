<template>
    <div class="todos">
        <div class="todos-header">
            <div class="todos-fallback">
                <router-link to="/">
                    <unicon name="arrow-left" fill="limegreen" width="30" height="30"></unicon>
                </router-link>
            </div>
            <div class="todos-category"></div>
            <div class="todos-settings-link">
                <router-link to="/settings">
                    <unicon name="cog" fill="limegreen" width="30" height="30"></unicon>
                </router-link>
            </div>
        </div>

        <div class="errors">
            <div v-if="errorGetData" class="alert-message">Error on getting data from the server</div>
            <div v-if="errorCreateTodo" class="alert-message">Error on creating new Todo</div>
            <div v-if="errorUpdateTodo" class="alert-message">Error on updating Todo</div>
            <div v-if="errorDeleteTodo" class="alert-message">Error on deleting Todo</div>
        </div>

        <div class="todos-new-todo">
            <textarea 
                v-model="newTodoValue" 
                v-focus placeholder="Enter new todo..."
                @keyup.enter="enterNewTodo" ></textarea>
        </div>

        <todo 
            v-for="todo of todos" 
            :key="todo.id" 
            :todo="todo" 
            @onCompleteTodo="onCompleteTodo" 
            @onSelectTodo="onSelectTodo"
            @onEditTodo="onEditTodo" />

        <div class="todos-delete-selected-btn" v-if="isSelectedTodosExists" @click="onDeleteTodos">
            <unicon name="trash-alt" fill="#e27d60" width="50" height="50"></unicon>
        </div>
    </div>
</template>

<script>
import Todo from '@/components/Todo.vue';
import { ApiService } from '../services/api';

export default {
    components: {
        Todo,
    },

    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            },
        },
    },

    data() {
        return {
            categoryId: '',
            todos: [],
            selectedTodos: [],
            newTodoValue: '',
            errorGetData: false,
            errorCreateTodo: false,
            errorUpdateTodo: false,
            errorDeleteTodo: false
        }
    },

    computed: {
        isSelectedTodosExists() {
            return this.selectedTodos.length ? true : false;
        }
    },

    created() {
        console.log(this.$route.params);
        const categoryId = this.$route.params.id;
        this.categoryId = categoryId;
        ApiService.getTodosByCategory(categoryId)
        .then(res => {
            this.todos = res.data;
        })
        .catch(error => {
            console.error(error);
            this.errorGetData = true;
        })
    },

    methods: {
        onCompleteTodo(payload) {
            const updatedTodo = this.todos.find(todo => todo._id === payload._id);
            const updatedTodoIndex = this.todos.findIndex(todo => todo._id === payload._id);
            updatedTodo.isComplete = payload.isComplete;
            ApiService.updateTodo(updatedTodo)
            .then(res => {
                this.todos.splice(updatedTodoIndex, 1);
                //this.todos[updatedTodoIndex] = res.data;
            })
            .catch(error => {
                console.error(error);
                this.errorUpdateTodo = true;
            })
        },

        onSelectTodo(payload) {
            if (payload.isSelected)
                this.selectedTodos.push(payload._id);
            else {
                const unselectedIndex = this.selectedTodos.findIndex(todo => todo === payload._id);
                this.selectedTodos.splice(unselectedIndex, 1);
            }
        },

        onEditTodo(payload) {
            const updatedTodo = this.todos.find(todo => todo._id === payload._id);
            const updatedTodoIndex = this.todos.findIndex(todo => todo._id === payload._id);
            updatedTodo.content = payload.content;
            ApiService.updateTodo(updatedTodo)
            .then(res => {
                this.todos[updatedTodoIndex] = res.data;
            })
            .catch(error => {
                console.error(error);
                this.errorUpdateTodo = true;
            })
        },

        enterNewTodo() {
            this.resetMessages();
            const obj = {
                content: this.newTodoValue,
                isComplete: false,
                category: this.categoryId
            };
            ApiService.createTodo(obj)
            .then(res => {
                this.todos.push(res.data);
                this.newTodoValue = '';
            })
            .catch(error => {
                console.error(error);
                this.errorCreateTodo = true;
            })
        },

        onDeleteTodos() {
            const todosForDelete = [];
            this.selectedTodos.forEach(selectedTodo => {
                todosForDelete.push(ApiService.deleteTodo(selectedTodo));
            });
            Promise.all(todosForDelete)
            .then(res => {
                const actuallyTodos = this.todos.filter(todo => {
                    if (this.selectedTodos.includes(todo._id))
                        return false
                    else
                        return true;
                });
                this.selectedTodos = [];
                this.todos = actuallyTodos;                
            })
            .catch(error => {
                console.error(error);

            })
        },

        resetMessages() {
            this.errorGetData = false;
            this.errorCreateTodo = false;
            this.errorUpdateTodo = false;
            this.errorDeleteTodo = false;
        }
    },
};
</script>

<style scoped lang='scss'>
    .todos {
        position: relative;

        & .todos-header {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin: 3% 0;
        }

        & .todos-new-todo {

            & textarea {
                width: 60%;
                border: none;
                outline: 0;
                resize: none;
                padding: 1%;
                border: 1px solid limegreen;
                border-radius: 5px;
                  box-shadow: -10px 10px 0 0 lightgrey;
            }
        }

        & .todos-delete-selected-btn {
            position: absolute;
            bottom: 1%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            cursor: pointer;
        }

        & .errors {
            margin-bottom: 20px;
            font-size: 18px;
            color: red;
            font-weight: 400;
        }
    }
</style>
