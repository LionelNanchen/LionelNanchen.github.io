<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";
import { riddles } from "@/utils";
import { Unlock } from '@element-plus/icons-vue';
import Click from "../../assets/sounds/click.wav";

enum Success { NotSet, False, Right };

interface Data {
    alphabet: string[],
    code: string,
    answer: string,
    success: Success,
    Success,
}

export default defineComponent({
    components: { Unlock },
    data() {
        const data: Data = {
            alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            code: "",
            answer: "nuptia",
            success: Success.NotSet,
            Success,
        };
        return data;
    },
    methods: {
        onChange(index, value) {
            if (this.success !== Success.NotSet) this.success = Success.NotSet;
            const array = this.code.split("");
            array[index] = value;
            this.code = array.join("");
            if (this.code.toLowerCase() === this.answer) {
                // Play audio
                const audio = new Audio(Click);
                audio.play();

                // Shake
                const cryptex = document.getElementById("cryptex-container");
                if (cryptex) {
                    cryptex.className = "cryptex-container cryptex-shake";
                    setTimeout(() => {
                        cryptex.className = "cryptex-container";
                    }, 300);
                }
            }
        },
        onUnlock() {
            if (this.code.toLowerCase() === this.answer) {
                this.success = Success.Right;
            } else {
                this.success = Success.False;
            }
        }
    },
    computed: {
        indexes() {
            return _.range(0, riddles.length);
        }
    }
})
</script>

<template>
    <div id="cryptex-container" class="cryptex-container">
        <pd-select-box class="cryptex-select">
            <pd-select-item v-for="index in indexes" :listData="alphabet" type="cycle"
                @input="value => onChange(index, value)" />
        </pd-select-box>
    <el-button class="cryptex-button" @click="onUnlock" type="primary" round>
        <el-icon>
            <Unlock />
        </el-icon>
    </el-button>
    </div>
    <el-alert class="cryptex-alert" v-if="success === Success.Right" title="576" type="success" show-icon
        :closable="false" effect="dark" />
    <el-alert class="cryptex-alert" v-if="success === Success.False" title="Mauvaise combinaison!" type="error" show-icon
        :closable="false" effect="dark" />
</template>

<style scoped>
@keyframes shake {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(0.5deg);
    }

    50% {
        transform: rotate(0eg);
    }

    75% {
        transform: rotate(-0.5deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

.cryptex-shake {
    animation: shake 0.3s linear;
}

.cryptex-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.cryptex-select {
    width: 100%;
}

.cryptex-button {
    margin-top: 12px;
}

.cryptex-alert {
    margin-top: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<style>
.pd-select-line:after,
.pd-select-line:before {
    background: var(--el-color-primary-dark-2) !important;
}
</style>