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

const data = [
    {
        id: 1,
        name: 'Test',
        isComplete: true,
    },
    {
        id: 2,
        name: 'Test2',
        isComplete: false,
    },
    {
        id: 3,
        name: 'Test3',
        isComplete: false,
    },
    {
        id: 4,
        name: 'Test565',
        isComplete: false,
    },
    {
        id: 454,
        name: 'Test45454',
        isComplete: false,
    },
]
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
            todos: data,
            selectedTodos: [],
            newTodoValue: '',
        }
    },

    computed: {
        isSelectedTodosExists() {
            return this.selectedTodos.length ? true : false;
        }
    },

    methods: {
        onCompleteTodo(payload) {
            const updatedTodo = this.todos.find(todo => todo.id === payload.id);
            const updatedTodoIndex = this.todos.findIndex(todo => todo.id === payload.id);
            updatedTodo.isComplete = payload.isComplete;
            this.todos[updatedTodoIndex] = updatedTodo;
        },

        onSelectTodo(payload) {
            if (payload.isSelected)
                this.selectedTodos.push(payload.id);
            else {
                const unselectedIndex = this.selectedTodos.findIndex(todo => todo === payload.id);
                this.selectedTodos.splice(unselectedIndex, 1);
            }
        },

        onEditTodo(payload) {
            const updatedTodo = this.todos.find(todo => todo.id === payload.id);
            const updatedTodoIndex = this.todos.findIndex(todo => todo.id === payload.id);
            updatedTodo.name = payload.name;
            this.todos[updatedTodoIndex] = updatedTodo;
        },

        enterNewTodo(event) {
            console.log(event.target.value);
            const newTodo = event.target.value;
            const obj = {
                id: Math.floor(Math.random() * 10000),
                name: newTodo,
                isComplete: false,
            };
            this.todos.push(obj);
            this.newTodoValue = '';
        },

        onDeleteTodos() {
            const updatedTodos = this.todos.filter(todo => {
                if (this.selectedTodos.includes(todo.id))
                    return false
                else
                    return true;
            });
            this.selectedTodos = [];
            this.todos = updatedTodos;
        },
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
    }
</style>
