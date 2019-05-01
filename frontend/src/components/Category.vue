<template>
    <div class="category-item" @click="selectCategory()">
        <div class="default-category-icon">
            <unicon name="folder" fill="limegreen" width="30" height="30"></unicon>
        </div>
        <div class="category-name">
            {{category.name}}
        </div>
        <div class="category-stats">
            <span>active tasks: {{todosAmount}}</span>
        </div>
    </div>
</template>

<script>
import { ApiService } from '../services/api';
export default {
    props: ['category'],
    data() {
        return {
            todosAmount: 0,
        }
    },
    created() {
        ApiService.getTodosAmountByCategory(this.category._id)
        .then(res => {
            this.todosAmount = res.data;
        })
        .catch(error => {
            console.error(error);
            const errorData = error.response;
            if (errorData.status === 401)
                this.$router.push('/login');
        })
    },
    methods: {
        selectCategory: function() {
            const catId = this.category._id;
            this.$router.push({name: 'todos', params: {id: catId}});
        }
    }
}
</script>

<style scoped lang="scss">
    .category-item {
        flex-basis: 10%;
        margin: 2%;
        padding: 3% 5%;
        background: #fff;
        box-shadow: -10px 10px 10px 0px lightgrey;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all .3s;

        &:hover {
            box-shadow: -1px 1px 1px 0px lightgrey;
            border: 1px solid limegreen;
        }

        & .category-icon {
            margin-bottom: 10px;
        }

        & .category-name {
            margin-bottom: 10px;
        }

        & .category-stats {
            margin-bottom: 10px;
            font-size: 12px;
        }
    }
</style>
