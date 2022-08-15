<script lang="ts">
import { defineComponent } from "vue";
import router from '@/router'
import Title from "../../assets/general/title_vertical.png";
import CryptexImage from "../../assets/general/cryptex.png";
import Cryptex from "./Cryptex.vue";

interface Data {
    title: string,
    cryptex: string,
    cryptexVisible: boolean,
}

export default defineComponent({
    components: { Cryptex },
    data() {
        const data: Data = {
            title: Title,
            cryptex: CryptexImage,
            cryptexVisible: false,
        };
        return data;
    },
    methods: {
        onClickCryptex() {
            this.cryptexVisible = true;
        },
        onCloseCryptex() {
            this.cryptexVisible = false;
        },
        onClickTitle() {
            router.push("/");
        }
    },
})
</script>

<template>
    <div class="header">
        <img class="header-cryptex" :src="cryptex" @click="onClickCryptex"/>
        <img class="header-title" :src="title" @click="onClickTitle" />
        <div style="width: 30px;" />
        <el-dialog v-model="cryptexVisible" title="Cryptex" width="90%" :close-on-click-modal="false" :before-close="onCloseCryptex">
            <Cryptex />
        </el-dialog>
    </div>
</template>

<style scoped>
.header {
    background-color: var(--el-color-primary);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 10px;
    padding-bottom: 10px;
}

.header-cryptex {
    width: 30px;
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