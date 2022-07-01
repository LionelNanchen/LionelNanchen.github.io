<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import { RefreshLeft } from '@element-plus/icons-vue';
import ResetButton from '../components/common/ResetButton.vue';

interface Hieroglyph {
    h: string,
    r: string,
}

export default defineComponent({
    components: { Container, RefreshLeft, ResetButton },
    data() {
        return {
            text: "🌙’🏝🥷🐉🏝🐶🐘 🇶🇦🇺🇦🐘 🚂🇺🇦 🐶🦉🐘🦈🐶🦉🐘👩‍🔬 🐘👩‍🔬🚂 🌙🕷 🌙🐘🚂🚂🦈🐘 🧙🏻‍♂️, ⛵️🦈🕷🍷🫒!",
            textUpdated: "🌙’🏝🥷🐉🏝🐶🐘 🇶🇦🇺🇦🐘 🚂🇺🇦 🐶🦉🐘🦈🐶🦉🐘👩‍🔬 🐘👩‍🔬🚂 🌙🕷 🌙🐘🚂🚂🦈🐘 🧙🏻‍♂️, ⛵️🦈🕷🍷🫒!",
            hieroglyphs: [
                { h: "🌙", r: "" },
                { h: "🏝", r: "" },
                { h: "🥷", r: "" },
                { h: "🐉", r: "" },
                { h: "🐶", r: "" },
                { h: "🐘", r: "" },
                { h: "🇶🇦", r: "" },
                { h: "🇺🇦", r: "" },
                { h: "🚂", r: "" },
                { h: "🦉", r: "" },
                { h: "🦈", r: "" },
                { h: "👩‍🔬", r: "" },
                { h: "🕷", r: "" },
                { h: "🧙🏻‍♂️", r: "" },
                { h: "⛵️", r: "" },
                { h: "🍷", r: "" },
                { h: "🫒", r: "" },
            ],
        };
    },
    watch: {
        hieroglyphs: {
            handler() {
                var textUpdated = this.text;
                this.hieroglyphs.forEach((hieroglyph) => {
                    if (hieroglyph.r.length > 0) textUpdated = textUpdated.replaceAll(hieroglyph.h, hieroglyph.r);
                })
                this.textUpdated = textUpdated.replace(/^\w/, (c) => c.toUpperCase());;
            },
            deep: true,
        },
    },
    methods: {
        onReset() {
            this.hieroglyphs = this.hieroglyphs.map((hieroglyph: Hieroglyph) => ({ h: hieroglyph.h, r: "" }));
        }
    }
})

</script>

<template>
    <Container>
        <el-card class="hieroglyphs-card">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">Indices: 🐘 = E, 🧚‍♀️ = F, 🫒 = O</span>
                </div>
            </template>
            <p class="hieroglyphs-text">{{ textUpdated }}</p>
        </el-card>
        <el-card class="hieroglyphs-card">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">Liste</span>
                    <ResetButton :onReset="onReset" />
                </div>
            </template>
            <el-table border :data="hieroglyphs" style="width: 100%">
                <el-table-column prop="h" label="Hieroglyphs" class-name="hieroglyphs-item" />
                <el-table-column prop="r" label="Lettre">
                    <template #default="scope">
                        <el-input maxlength="1" show-word-limit type="text" v-model="scope.row.r" />
                    </template>
                </el-table-column>
            </el-table>
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

.hieroglyphs-card {
    margin: 12px
}

/* Text card */
.hieroglyphs-text {
    font-size: 24px;
    word-spacing: 16px;
}

/* List card */
</style>

<style>
td.hieroglyphs-item {
    font-size: 24px;
}

td.hieroglyphs-item>div {
    text-align: center;
}
</style>