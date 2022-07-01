<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Aim } from "@element-plus/icons-vue";
import ResetButton from "../common/ResetButton.vue";

interface Data {
    matrix: Matrix,
    ball: { ball: string, i: number, j: number } | undefined,
    verify: boolean | undefined,
}

export default defineComponent({
    components: { ResetButton, Aim },
    props: {
        startingMatrix: { type: Object as PropType<Matrix>, required: true },
        answerMatrix: { type: Object as PropType<Matrix>, required: true },
        answer: { type: String, required: true },
    },
    data() {
        const data: Data = {
            matrix: this.startingMatrix.map((r: (string | undefined)[]) => r.map((c: string | undefined) => c)),
            ball: undefined,
            verify: undefined,
        };
        return data;
    },
    computed: {
        message() {
            if (this.ball) {
                return `Déposez ${this.ball.ball}`;
            } else {
                return "Choisissez une balle";
            }
        }
    },
    methods: {
        onSelectCell(ball: string | undefined, i: number, j: number) {
            this.verify = undefined;
            // Drop ball
            if (this.ball) {
                this.matrix[this.ball.i][this.ball.j] = undefined;
                this.matrix[i][j] = this.ball.ball;
                this.ball = undefined;
            }
            // Pick up ball
            else if (ball) {
                this.ball = { ball, i, j };
            }
        },
        disableCell(cell: string | undefined) {
            if (this.ball) {
                return cell && cell !== this.ball.ball;
            } else if (cell) {
                return false;
            }
            return true;
        },
        onReset() {
            this.verify = undefined;
            this.matrix = this.startingMatrix.map((r: (string | undefined)[]) => r.map((c: string | undefined) => c));
        },
        onVerify() {
            for (let i = 0; i < this.matrix.length; ++i) {
                for (let j = 0; j < this.matrix[i].length; ++j) {
                    if (this.matrix[i][j] !== this.answerMatrix[i][j]) {
                        this.verify = false;
                        return;
                    }
                }
            }
            this.verify = true;
        },
    }
});
</script>

<template>
    <el-card class="double-memories-card">
        <template #header>
            <div class="card-header">
                <span class="double-memories-message">{{ message }}</span>
                <ResetButton :onReset="onReset" />
            </div>
        </template>
        <el-row justify="space-evenly" align="middle" v-for="(row, i) in matrix">
            <el-col :span="2" v-for="(cell, j) in row">
                <el-button class="double-memories-cell" text circle :disabled="disableCell(cell)"
                    @click="() => onSelectCell(cell, i, j)">
                    <span v-if="cell" v-bind:style="cell === ball?.ball ? 'opacity: 0.5;' : ''">{{ cell }}</span>
                    <el-icon v-else>
                        <Aim />
                    </el-icon>
                </el-button>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 12px">
            <el-button @click="onVerify" type="primary" round :disabled="!!ball">Vérifier</el-button>
        </el-row>
        <el-result v-if="verify === true" icon="success" title="Combinaison correcte" v-bind:sub-title="`Lettre: ${answer}`" />
        <el-result v-else-if="verify === false" icon="error" title="Combinaison incorrecte" sub-title="Essaie encore" />
    </el-card>
</template>

<style scoped>
.double-memories-card {
    margin: 12px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.double-memories-message {
    font-size: 20px;
    font-weight: bold;
}

.double-memories-cell {
    font-size: 22px;
}
</style>