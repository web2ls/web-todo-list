<template>
    <div class="settings">
        <div class="settings-header">
            <div class="settings-fallback">
                <router-link to="/">
                    <unicon name="arrow-left" fill="limegreen" width="30" height="30"></unicon>
                </router-link>
            </div>
        </div>
        <div class="categories">
            <div class="header">Add Category</div>
            <div class="create-new-category">
                <input type="text" v-model="newCategoryName" autocomplete="off" placeholder="category name...">
                <br />
                <input type="text" v-model="newCategoryIcon" autocomplete="off" placeholder="category icon...">
                <button class="save-new-category-btn" type="button" @click="createCategory">Add me</button>

                <div class="success">
                    <div v-if="successCreateNewCategory" class="success-message">Category has been created</div>
                    <div v-if="successUpdateCategory" class="success-message">Category has been updated</div>
                </div>

                <div class="errors">
                    <div v-if="errorNewCategoryName" class="alert-message">Wrong new Category name</div>
                    <div v-if="errorCreateNewCategory" class="alert-message">Error on creating new Category</div>
                    <div v-if="errorUpdateCategory" class="alert-message">Error on updating Category</div>
                    <div v-if="errorDeleteCategory" class="alert-message">Error on deleting Category</div>
                    <div v-if="errorGetData" class="alert-message">Error on getting data from the server</div>
                </div>
            </div>

            <div class="list">
                <div class="list-header">Categories list</div>
                <div class="category-item" v-for="category of categories" :key="category._id">
                    <input class="name" type="text" v-model="category.name">
                    <div class="controls">
                        <unicon class="control-icon" name="edit" width="20" height="20" @click="editCategory(category)"></unicon>
                        <unicon class="control-icon" name="trash-alt" width="20" height="20" @click="deleteCategory(category._id)"></unicon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ApiService } from '../services/api.js';

export default {
    data() {
        return {
            newCategoryName: '',
            newCategoryIcon: '',
            categories: [],
            successCreateNewCategory: false,
            successUpdateCategory: false,
            errorNewCategoryName: false,
            errorCreateNewCategory: false,
            errorUpdateCategory: false,
            errorDeleteCategory: false,
            errorGetData: false,
        }
    },
    created() {
        ApiService.getCategories()
        .then(res => {
            this.categories = res.data;
        })
        .catch(error => {
            console.error(error);
            this.errorGetData = true;
        })
    },
    methods: {
        getNewCategoryObj() {
            return {
                name: this.newCategoryName,
                icon: this.newCategoryIcon
            }
        },
        createCategory() {
            this.resetMessages();
            if (!this.newCategoryName) {
                this.errorNewCategoryName = true;
                return;
            }

            const newCategory = this.getNewCategoryObj();
            ApiService.createCategory(newCategory)
            .then(res => {
                this.successCreateNewCategory = true;
                this.categories.push(res.data);
            })
            .catch(error => {
                console.error(error);
                this.errorCreateNewCategory = true;
            });
        },
        editCategory(category) {
            this.resetMessages();
            if (!category.name) {
                this.errorNewCategoryName = true;
                return;
            }

            ApiService.updateCategory(category)
            .then(res => {
                this.successUpdateCategory = true;
            })
            .catch(error => {
                console.error(error);
                this.errorUpdateCategory = true;
            })
        },
        deleteCategory(categoryId) {
            ApiService.deleteCategory(categoryId)
            .then(res => {
                this.categories = this.categories.filter(item => item._id !== categoryId);
            })
            .catch(error => {
                console.error(error);
                this.errorDeleteCategory = true;
            })
        },
        resetMessages() {
            this.errorNewCategoryName = false;
            this.errorCreateNewCategory = false;
            this.errorUpdateCategory = false;
            this.errorDeleteCategory = false;
            this.successCreateNewCategory = false;
            this.successUpdateCategory = false;
            this.errorGetData = false;
        }
    }

};
</script>

<style scoped lang="scss">
.settings {

    & .settings-fallback {
        text-align :left;
    }

    & .categories {
        margin: 20px 0;
        padding: 20px;
        border: 1px solid limegreen;
        border-radius: 10px;

        & .header {
            text-align: center;
            letter-spacing: 1px;
            font-weight: 700;
            font-size: 20px;
        }

        & .list-header {
            text-align: center;
            letter-spacing: 1px;
            font-weight: 700;
            font-size: 20px; 
        }

        & .create-new-category {
            margin: 20px 0;

            & input {
                width: 100%;
                margin-bottom: 20px;
                border: none;
                outline: 0;
                border-bottom: 1px solid gray;
                background: #f5f5f5;
                transition: all 0.6s;

                &:focus {
                    border-bottom: 1px solid limegreen;
                }
            }

            & .save-new-category-btn {
                padding: 1%;
                border: 1px solid limegreen;
                outline: 0;
                font-size: 16px;
                font-weight: 300;
                text-transform: uppercase;
                transition: all 0.3s;

                &:hover {
                    background: limegreen;
                    border: 1px solid #fff;
                    font-weight: 400;
                    border-radius: 5px;
                    box-shadow: 1px 1px 5px 0px limegreen;
                }
            }

            & .success {
                margin: 20px 0;
                color: green;
                letter-spacing: 1px;
                font-weight: 700;
                font-size: 16px; 
            }

            & .errors {
                margin: 20px 0;
                color: red;
                letter-spacing: 1px;
                font-weight: 700;
                font-size: 16px;
            }
        }

        & .category-item {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            width: 80%;
            margin: 10px auto;
            padding: 1%;
            background: #fff;
            text-align: left;
            font-weight: 300;
            box-shadow: -10px 10px 10px 0px lightgrey;

            & .name {
                flex-basis: 90%;
                border: none;
                outline: 0;
                background: #fff;
                border-bottom: 1px solid gray;
            }

            & .controls {
                flex-basis: 10%;
                border-left: 1px solid #000;
                text-align: center;

                & .control-icon {
                    margin-left: 5%;
                    cursor: pointer;
                }
            }
        }
    }
}

</style>
