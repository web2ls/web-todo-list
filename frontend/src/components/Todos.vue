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
        <div class="todo" v-for="todo of todos" :key="todo.id">{{todo.name}}</div>
    </div>
</template>

<script>
const data = [
    {
        id: 1,
        name: 'Test'
    },
    {
        id: 2,
        name: 'Test2'
    },
    {
        id: 3,
        name: 'Test3'
    },
    {
        id: 4,
        name: 'Test565'
    },
    {
        id: 454,
        name: 'Test45454'
    },
]
export default {
    data() {
        return {
            todos: data,
        }
    },
};
</script>

<style scoped lang='scss'>
    .todos {

        &   .todo {
            width: 90%;
            min-height: 50px;
            padding: 1% 3%;
            margin: 3% auto;
            background: #fff;
            box-shadow: -10px 10px 10px 0px lightgrey;
            text-align: left;
            border: 1px solid transparent;
            transition: all .3s;
        }

        & .todos-header {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin: 3% 0;
        }
    }
</style>
