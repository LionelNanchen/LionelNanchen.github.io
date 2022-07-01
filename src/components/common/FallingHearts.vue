<script lang="ts">
import { defineComponent } from "vue";

interface Data {
    visible: boolean,
    hearts: string[],
    interval: NodeJS.Timer | undefined,
}

export default defineComponent({
    data() {
        const data: Data = {
            visible: false,
            hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '❤️‍🔥', '💖', '💝', '💘'],
            interval: undefined,
        };
        return data;
    },
    created() {
        console.log('Created');
        this.interval = setInterval(this.display, 300000)
    },
    beforeUnmount() {
        this.clearInterval();
    },
    methods: {
        clearInterval() {
            if (this.interval) {
                clearInterval(this.interval)
                this.interval = undefined;
            }
        },
        display() {
            this.visible = true;
            setTimeout(() => this.visible = false, 10000);
        },
        heart(): string {
            return this.hearts[Math.floor(Math.random() * this.hearts.length)];
        },
        numberOfHearts(): number {
            return Math.floor(Math.random() * 200) + 200;
        },
        style() {
            return {
                left: `${Math.floor(Math.random() * 100)}%`,
                'animation-delay': `${Math.random() * 5}s`,
                'font-size': `${Math.floor(Math.random() * 16) + 16}px`,
            };
        },
    },
})
</script>

<template>
    <div class="hearts-container" v-bind:style="visible ? 'pointer-events: none' : ''">
        <span v-if="visible" v-for="_ in numberOfHearts()" class="heart" :style="style()">
            {{ heart() }}
        </span>
        <slot />
    </div>
</template>

<style scoped>
.hearts-container {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
    height: 100%;
    width: 100%;
    background-color: transparent;
}

.heart {
    z-index: 1;
    position: absolute;
    animation: beat 2s ease infinite, fall 5s linear;
    animation-fill-mode: forwards;
    top: -60px;
}

@keyframes disappear {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes fall {
    0% {
        top: -60px;
    }

    100% {
        top: 100%;
    }
}

@keyframes beat {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.75);
    }

    100% {
        transform: scale(1);
    }
}
</style>