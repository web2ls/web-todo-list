<template>
    <div class="categories">
        <div class="nav">
            <div class="header">select categories</div>

            <div class="errors">
                <div v-if="errorGetDataMessage" class="alert-message">Error on getting data from the server</div>
            </div>

            <div class="settings-link">
                <router-link to="/settings">
                    <unicon name="cog" fill="limegreen" width="30" height="30"></unicon>
                </router-link>
            </div>
        </div>

        <div class="categories-list">
            <category v-for="category of categories" :key="category.id" :category="category"/>
        </div>
    </div>
</template>

<script>
import Category from '@/components/Category.vue';
import { ApiService } from '../services/api';

export default {
    components: {
        Category,
    },
    data() {
        return {
            categories: [],
            errorGetDataMessage: false,
        }
    },
    created() {
        ApiService.getCategories()
        .then(res => {
            console.log(res);
            this.categories = res.data;
        })
        .catch(error => {
            console.error(error);
            this.errorGetDataMessage = true;
        })
    },
    methods: {
        resetMessages() {
            this.errorGetDataMessage = false;
        }
    }
};
</script>

<style scoped lang='scss'>
    .categories {

        & .nav {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
            margin: 30px 0;

            & .header {
                font-size: 16px;
                text-transform: uppercase;
            }

            & .toggle-new-category-form {
                cursor: pointer;
            }

            & .settings-link {
                cursor: pointer;
            }
        }

        & .categories-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        & .errors {
            margin: 20px 0;
            color: red;
            letter-spacing: 1px;
            font-weight: 700;
            font-size: 16px;
        }
    }
</style>
