<template>
    <div class="projects">
        <div class="nav">
            <div class="header">select projects</div>
            <div class="settings-link">
                <unicon name="cog" fill="limegreen"></unicon>
            </div>
        </div>

        <div class="projects-list">
            <div class="project-item" v-for="project of data" :key="project.id">{{project.name}}</div>
        </div>
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
            data: data
        }
    }
}
</script>

<style scoped lang='scss'>
    .projects {

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

        & .projects-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            & .project-item {
                flex-basis: 15%;
                margin: 2%;
                padding: 3% 5%;
                background: #fff;
                box-shadow: -10px 10px 10px 0px lightgrey;
            }
        }
    }
</style>
