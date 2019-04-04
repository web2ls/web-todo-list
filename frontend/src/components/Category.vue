<template>
    <div class="category-item" @click="selectCategory()">
        <div class="category-icon">
            <unicon name="cog" fill="limegreen"></unicon>
        </div>
        <div class="category-name">
            {{category.name}}
        </div>
        <div class="category-stats">
            Active Tasks 10
        </div>
    </div>
</template>

<script>
export default {
    props: ['category'],
    methods: {
        selectCategory: function() {
            const catId = this.category.id;
            this.$router.push({name: 'todos', params: {id: catId}});
        }
    }
}
</script>

<style scoped lang=''<style lang="scss">
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
        }
    }
</style>
'>

</style>
