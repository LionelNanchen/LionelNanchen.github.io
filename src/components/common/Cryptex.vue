<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";
import { riddles } from "@/utils";

interface Data {
    alphabet: string[],
    code: string,
}

export default defineComponent({
    data() {
        const data: Data = {
            alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            code: "",
        };
        return data;
    },
    methods: {
        onChange(index, value) {
            const array = this.code.split("");
            array[index] = value;
            this.code = array.join("");
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
    <div class="cryptex-container">
        <pd-select-box class="cryptex-container">
            <pd-select-item v-for="index in indexes" :listData="alphabet" type="cycle" @input="value => onChange(index, value)"/>
        </pd-select-box>
    </div>
</template>

<style scoped>
</style>