<script lang="ts">
import { defineComponent } from "vue";
import { Aim } from "@element-plus/icons-vue";
import Container from "../components/common/Container.vue";
import ResetButton from "../components/common/ResetButton.vue";
import MemoriesMatrix from "../components/memories/MemoriesMatrix.vue";

interface Data {
    startingMatrix: Matrix,
    answerMatrix: Matrix,
    answer: string,
}

export default defineComponent({
    components: { Container, ResetButton, Aim, MemoriesMatrix },
    data() {
        const data: Data = {
            startingMatrix: [
                ['⚽️', undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, '🏀', undefined],
                [undefined, undefined, undefined, undefined, '🪩'],
                [undefined, undefined, '⚾️', undefined, undefined],
                [undefined, '🎾', undefined, undefined, undefined],
            ],
            answerMatrix: [
                [undefined, '⚾️', undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, '🎾'],
                [undefined, undefined, undefined, '⚽️', undefined],
                [undefined, undefined, undefined, '🪩', undefined],
                ['🏀', undefined, undefined, undefined, undefined],
            ],
            answer: 'U',
        };
        return data;
    },
});
</script>

<template>
    <Container>
        <MemoriesMatrix :startingMatrix="startingMatrix" :answerMatrix="answerMatrix" :answer="answer" />
    </Container>
</template>