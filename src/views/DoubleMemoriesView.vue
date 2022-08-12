<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import MemoriesMatrix from "../components/memories/MemoriesMatrix.vue";

interface Data {
    startingMatrix: Matrix,
    answerMatrix: Matrix,
    answer: string,
}

export default defineComponent({
    components: { Container, MemoriesMatrix },
    data() {
        const data: Data = {
            startingMatrix: [
                ['⚽️', undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, '🏀', undefined],
                [undefined, undefined, undefined, undefined, '🎱'],
                [undefined, undefined, '⚾️', undefined, undefined],
                [undefined, '🏐', undefined, undefined, undefined],
            ],
            answerMatrix: [
                [undefined, '⚾️', undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, '🏐'],
                [undefined, undefined, undefined, '⚽️', undefined],
                [undefined, undefined, undefined, '🎱', undefined],
                ['🏀', undefined, undefined, undefined, undefined],
            ],
            answer: 'T',
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