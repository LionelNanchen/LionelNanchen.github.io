<script lang="ts">
import { riddles } from "@/utils";
import { defineComponent } from "vue";
import router from '@/router';
import Container from "../components/common/Container.vue";
import Cryptex from "../components/common/Cryptex.vue";

export default defineComponent({
    components: { Container, Cryptex, Cryptex },
    data() {
        return {
            firstRiddle: riddles[0],
        };
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
                <p class="welcome-text center">Pour commencer cliquer sur la 1re énigme:</p>
                <div class="center">
                    <div class="welcome-first-riddle" @click="onClick">
                        <span>{{ firstRiddle.index }}</span>
                        <span class="welcome-riddle-title">{{ firstRiddle.title }}</span>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="welcome-card">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">Cryptex</span>
                </div>
            </template>
            <Cryptex />
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
</style>