<script lang="ts">
import { defineComponent } from "vue";
import router from '@/router'
import Title from "../../assets/general/title_vertical.png";

interface Data {
    title: string,
}

export default defineComponent({
    data() {
        const data: Data = {
            title: Title,
        };
        return data;
    },
    methods: {
        onClick() {
            router.push('/');
        }
    },
})
</script>

<template>
    <div class="header">
        <img class="header-title" :src="title" @click="onClick" />
    </div>
</template>

<style scoped>
.header {
    background-color: var(--el-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
}

.header-title {
    height: 40px;
}
</style>

<style>
.el-header {
    padding: 0px !important;
}
</style>