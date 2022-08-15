<script lang="ts">
import { riddles } from "@/utils";
import { defineComponent } from "vue";
import router from '@/router';
import Container from "../components/common/Container.vue";
import Cryptex from "../assets/general/cryptex.png";

interface Data {
    firstRiddle: Riddle,
    cryptex: string,
}

export default defineComponent({
    components: { Container },
    data() {
        const data: Data = {
            firstRiddle: riddles[0],
            cryptex: Cryptex,
        };
        return data;
    },
    methods: {
        onClick() {
            router.push(`/${this.firstRiddle.id}`);
        }
    }
})

</script>

<template>
    <Container welcome>
        <el-card class="welcome-card">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">Escape Game</span>
                </div>
            </template>
            <p class="welcome-text center">{{ "Les mariés m'ont demandé d'organiser un Escape Game pour leur mariage.\nJ'ai donc créé ce site web." }}</p>
            <p class="welcome-text center" style="margin: 12px 0px">Amusez-vous bien !!!</p>
            <p class="welcome-text center">Merci</p>
            <el-divider />
            <div>
                <p class="welcome-text center">Pour ouvrir le cryptex, cliquer sur l'icône en haut à droite:</p>
                <div class="center">
                    <img class="cryptex" :src="cryptex" />
                </div>
            </div>
            <el-divider />
            <div>
                <p class="welcome-text center">Pour commencer cliquer sur la 1re énigme:</p>
                <div class="center">
                    <div class="welcome-first-riddle" @click="onClick">
                        <span>{{ firstRiddle.index }}</span>
                        <span class="welcome-riddle-title">{{ firstRiddle.title }}</span>
                    </div>
                </div>
            </div>
        </el-card>
    </Container>
</template>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-title {
    font-weight: bold;
}

.welcome-card {
    margin: 12px
}

.welcome-text {
    font-size: 20px;
}

.welcome-first-riddle {
    background-color: var(--el-color-primary-light-9);
    border-radius: 16px;
    margin-top: 12px;
    width: 80px;
    height: 80px;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.welcome-riddle-title {
    font-size: 12px;
    text-align: center;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.cryptex {
    width: 40px;
}
</style>