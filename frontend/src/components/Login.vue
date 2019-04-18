<template>
    <div class="login">
        <div class="header">Authentication</div>
        <form class="form" @submit.prevent="onSubmit" novalidate="true">
            <div>
                <input type="email" placeholder="email..." v-model="email">
                <div class="alert-message" v-if="errorEmailRequired">Email is required</div>
                <div class="alert-message" v-if="errorEmailWrong">Wrong email</div>
            </div>
            <div>
                <input type="password" v-model="password" placeholder="password...">
                <div class="alert-message" v-if="errorPasswdRequired">Password is required</div>
            </div>

            <div class="controls">
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            errors: [],
            email: null,
            password: null,
            errorEmailRequired: false,
            errorPasswdRequired: false,
            errorEmailWrong: false
        }
    },
    methods: {
        onSubmit() {
            this.resetMessages();

            if (!this.email) {
                this.errorEmailRequired = true;
                return;
            }

            if (!this.password) {
                this.errorPasswdRequired = true;
                return;
            }

            if (!this.email.includes('.')) {
                this.errorEmailWrong = true;
                return;
            }

            if (!this.email.includes('@')) {
                this.errorEmailWrong = true;
                return;
            }

            console.log(this.email, this.password);
        },
        resetMessages() {
            this.errorEmailRequired = false;
            this.errorPasswdRequired = false;
            this.errorEmailWrong = false;
        }
    }
}
</script>

<style scoped lang="scss">
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    padding: 5%;
    background: #fff;
    width: 40%;

    & .header {
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    & .form {

        & input {
            width: 100%;
            padding: 1%;
            border: none;
            outline: 0;
            border-bottom: 1px solid gray;
            margin-bottom: 20px;
            transition: all 0.3s;

            &:focus {
                border-bottom: 1px solid limegreen;
            }
        }

        & .controls button {
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

        & .alert-message {
            color: red;
            font-size: 18px;
            letter-spacing: 1px;
        }
    }
    
}
</style>
