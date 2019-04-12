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
            <div class="header">Categories</div>
            <div class="create-new-category">
                <input type="text" v-model="newCategoryName" autocomplete="off" placeholder="category name...">
                <br />
                <input type="text" v-model="newCategoryIcon" autocomplete="off" placeholder="category icon...">
                <button class="save-new-category-btn" type="button" @click="createCategory">Create me</button>

                <div class="success">
                    <div v-if="successCreateNewCategory" class="success-message">Category has been created</div>
                </div>

                <div class="errors">
                    <div v-if="errorNewCategoryName" class="alert-message">Wrong new Category name</div>
                    <div v-if="errorCreateNewCategory" class="alert-message">Error on creating new Category</div>
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
            successCreateNewCategory: false,
            errorNewCategoryName: false,
            errorCreateNewCategory: false,
        }
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
            })
            .catch(error => {
                console.error(error);
                this.errorCreateNewCategory = true;
            });
        },
        resetMessages() {
            this.errorNewCategoryName = false;
            this.errorCreateNewCategory = false;
            this.successCreateNewCategory = false;
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
    }
}

</style>
