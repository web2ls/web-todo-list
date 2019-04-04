<template>
    <div class="categories">
        <div class="nav">
            <div class="header">select categories</div>
            <div class="settings-link">
                <router-link to="/settings">
                    <unicon name="cog" fill="limegreen" width="30" height="30"></unicon>
                </router-link>
            </div>
        </div>

        <div class="categories-list">
            <category v-for="category of data" :key="category.id" :category="category"/>
        </div>
    </div>
</template>

<script>
    import Category from '@/components/Category.vue';

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
    components: {
        Category,
    },
    data() {
        return {
            data: data
        }
    },
};
</script>

<style scoped lang='scss'>
    .categories {

        & .nav {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
            margin: 20px 0;

            & .header {
                font-size: 16px;
                text-transform: uppercase;
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
    }
</style>
