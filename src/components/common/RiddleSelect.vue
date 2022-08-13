<script lang="ts">
import router from '@/router';
import moment from 'moment';
import { defineComponent, type PropType } from 'vue';

interface Data {
    accessible: boolean,
    interval: NodeJS.Timer | undefined,
}

export default defineComponent({
    props: {
        riddle: { type: Object as PropType<Riddle>, required: true },
        currentRiddle: { type: Object as PropType<Riddle> },
    },
    data() {
        const data: Data = {
            accessible: false,
            interval: undefined,
        };
        return data;
    },
    created() {
        // Check riddle available time
        this.checkAccessibility();
        if (!this.accessible) this.interval = setInterval(this.checkAccessibility, 10000);
    },
    beforeUnmount() {
        this.clearInterval();
    },
    methods: {
        onClick() {
            if (this.riddle.id !== this.currentRiddle?.id) {
                router.push(`/${this.riddle.id}`);
            }
        },
        clearInterval() {
            if (this.interval) {
                clearInterval(this.interval)
                this.interval = undefined;
            }
        },
        checkAccessibility() {
            const now = moment();
            const tmp = moment(this.riddle.availableTime, "HH:mm");
            const availableTime = moment(now);
            availableTime.hours(tmp.hours());
            availableTime.minutes(tmp.minutes());
            if (availableTime.diff(now, "seconds") <= 0) {
                this.accessible = true;
                this.clearInterval();
            }
        },
    }
})
</script>

<template>
    <div>
        <div class="riddle" v-bind:class="(currentRiddle?.id === riddle.id) ? 'current-riddle' : ''"
            v-bind:style="riddle.response.length > 0 && currentRiddle?.id !== riddle.id ? 'background-color: var(--el-color-primary-light-5)' : ''"
            @click="onClick">
            <span v-if="riddle.response.length > 0" style="font-weight: bold">{{ riddle.response.toUpperCase() }}</span>
            <span v-else>{{ riddle.index }}</span>
            <span class="riddle-title">{{ accessible ? riddle.title : "???" }}</span>
        </div>
    </div>
</template>

<style scoped>
.riddle {
    background-color: var(--el-color-primary-light-9);
    border-radius: 16px;
    margin: 12px;
    width: 80px;
    height: 80px;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.riddle:last-child {
    margin-right: 12px;
}

.riddle-title {
    font-size: 12px;
    text-align: center;
}

.current-riddle {
    color: white;
    background-color: var(--el-color-primary);
}
</style>