<template>
    <div class="not-found">
        <div class="content">
            <div>
                Sorry, but required data not found...
            </div>
            <div>
                <router-link to="/">Try back to main page</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.not-found {
    width: 100%;
    height: 100vh;
    font-size: 24px;

    & .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;

        & div {
            margin-bottom: 20px;
        }

        & a {
            color: limegreen;
            text-decoration: none;
        }
    }
}
</style>
