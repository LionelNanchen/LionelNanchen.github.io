<script lang="ts">
import { defineComponent, type PropType } from "vue";
import Container from "../components/common/Container.vue";
import Tree from "../assets/axe/tree.jpg";
import TreeCracked from "../assets/axe/tree_cracked.png";
import Down from "../assets/axe/down.jpg";
import Fireplace from "../assets/axe/fireplace.jpg";
import Axe1 from "../assets/axe/axe_1.png";
import Axe2 from "../assets/axe/axe_2.png";

enum Step {
    First = 10,
    Second = 20,
    Third = 30,
    Final = 50,
};

interface Data {
    logs: number,
    isCutting: boolean,
    Step: any,
}


export default defineComponent({
    components: { Container },
    data() {
        const data: Data = {
            Step,
            logs: 0,
            isCutting: false,
        };
        return data;
    },
    methods: {
        time(): number {
            if (this.logs < Step.First) return 300;
            else if (this.logs < Step.Second) return 500;
            else if (this.logs < Step.Third) return 800;
            else return 1200;
        },
        onCut() {
            this.isCutting = true;
            setTimeout(() => {
                this.isCutting = false;
                ++this.logs;
            }, this.time());
        }
    },
    computed: {
        tree(): string {
            if (this.logs < Step.First) return Tree;
            if (this.logs < Step.Second) return TreeCracked;
            else if (this.logs < Step.Final) return Down;
            else return Fireplace;
        },
        axe(): string {
            return this.logs < Step.First ? Axe1 : Axe2;
        },
    },
});
</script>

<template>
    <Container>
        <el-card class="axe-card">
            <template #header>
                <span style="font-weight: bold;">🪵 x {{ logs }}</span>
            </template>
            <div class="axe-card-content">
                <img style="width: 100%" :src="tree" fit="fill" />
                <el-button v-if="logs < Step.Final" class="axe-button" round text :disabled="isCutting" @click="onCut">
                    <img :style="{ animationDuration: `${time() / 1000}s` }"
                        v-bind:class="isCutting ? 'axe-cut-animation' : ''" class="axe-image" :src="axe" fit="fill" />
                </el-button>
            </div>
            <div style="margin-top: 12px">
                <el-alert v-if="logs >= Step.First && logs < Step.Second" title="Crac ... Bon, une plus grosse hache hache 🪓" type="info"
                    :closable="false" effect="dark" show-icon />
                <el-alert v-if="logs >= Step.Second && logs < Step.Third" title="Boom ... Guillaume à terre! 😵" type="warning"
                    :closable="false" effect="dark" show-icon />
                <el-alert v-if="logs >= Step.Third && logs < Step.Final" title="Mais laisse Guillaume tranquille!" description="La réponse est devant tes yeux! 👀" type="error"
                    :closable="false" effect="dark" show-icon />
                <el-alert v-if="logs >= Step.Final"
                    title="Avec tous ce bois on peut se faire un petit feu! 🔥" type="info"
                    :closable="false" effect="dark" show-icon />
            </div>
        </el-card>
    </Container>
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
    object-fit: fill;
}

.axe-card {
    margin: 12px;
}

.axe-card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.axe-button {
    z-index: 1;
    padding: 0px !important;
    display: flex;
    align-items: end;
    position: absolute;
    background-color: transparent !important;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
}

.axe-image {
    height: 180px;
}

.axe-cut-animation {
    animation-name: cut;
}

@keyframes cut {
    100% {
        transform: rotate(90deg)
    }
}
</style>