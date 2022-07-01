<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import { RefreshLeft } from '@element-plus/icons-vue';
import ResetButton from '../components/common/ResetButton.vue';
import moment, { type Moment } from "moment";
import { riddles } from "@/utils";
import TimeAPI from "@/network/time";
import BladeRunner from "../assets/timetravel/blade_runner.jpg";
import BackToTheFuture from "../assets/timetravel/back_to_the_future.jpg";
import Delorean from "../assets/timetravel/delorean.png";

interface Data {
    riddleAvailableTime?: Moment,
    accessTime?: Moment,
    accessible: boolean,
    countdown?: number,
    interval: NodeJS.Timer | undefined,
    bladeRunner: string,
    backToTheFuture: string,
    delorean: string,
    modalVisible: boolean,
}

export default defineComponent({
    components: { Container, RefreshLeft, ResetButton },
    data() {
        const data: Data = {
            riddleAvailableTime: undefined,
            accessTime: undefined,
            accessible: false,
            countdown: undefined,
            interval: undefined,
            bladeRunner: BladeRunner,
            backToTheFuture: BackToTheFuture,
            delorean: Delorean,
            modalVisible: false,
        };
        return data;
    },
    created() {
        TimeAPI.now().then((now) => {
            const riddleTime = moment(riddles[2].availableTime, "HH:mm");
            now.hours(riddleTime.hours())
            now.minutes(riddleTime.minutes())
            this.riddleAvailableTime = now;
            this.accessTime = moment(now).add(1, "years");
        })
        this.checkTime();
        this.interval = setInterval(this.checkTime, 1000);
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
        checkTime() {
            if (this.accessTime) {
                const deviceTime = moment();
                this.countdown = this.accessTime.diff(deviceTime, "seconds");
                if (this.countdown < 0) this.accessible = true;
            }
        }
    },
    computed: {
        inaccessibleMessage(): string {
            if (this.countdown) return this.countdown < 0 ? 'ようこそ into the future' : `Revenez dans ${this.countdown.toLocaleString()} seconde${this.countdown > 1 ? 's' : ''}`;
            else return "Revenez dans ...";
        },
        countdownPercentage(): number {
            if (this.riddleAvailableTime && this.accessTime) {
                const deviceTime = moment();
                const percent = Math.floor(deviceTime.diff(this.riddleAvailableTime) * 100 / this.accessTime.diff(this.riddleAvailableTime));
                return percent > 100 ? 100 : percent;
            }
            return 0;
        },
        deloreanProgress(): string {
            const percentage = this.countdownPercentage;
            if (percentage < 10) return `left: calc(${percentage}% - 10px)`;
            if (percentage < 50) return `left: calc(${percentage}% - 30px)`;
            if (percentage < 80) return `left: calc(${percentage}% - 50px)`;
            return `left: calc(${percentage}% - 50px)`;
        },
        status(): string | undefined {
            const percentage = this.countdownPercentage;
            if (percentage < 50) return "exception";
            if (percentage < 80) return "warning";
            if (percentage < 100) return undefined;
            return "success";
        }
    }
})

</script>

<template>
    <Container>
        <el-card class="time-travel-card" v-loading="!countdown">
            <template #header>
                <div class="card-header">
                    <span class="card-header-title">{{ inaccessibleMessage }}</span>
                </div>
            </template>
            <div class="delorean-container">
                <img :src="delorean" class="delorean" :style="deloreanProgress" />
            </div>
            <el-progress v-bind:class="countdownPercentage < 10 ? 'progress-text' : ''" type="line"
                :percentage="countdownPercentage" :status="status" :stroke-width="30" :text-inside="true" />
            <div v-if="accessible" class="accessible-container">
                <el-image class="carousel-image" :src="bladeRunner" :preview-src-list="[bladeRunner]" :initial-index="0"
                    :preview-teleported="true" />
                <el-button @click="() => modalVisible = true" class="done-button" type="primary" round>
                    Quand tu aura terminé
                </el-button>
                <el-dialog class="dialog" title="⏱" v-model="modalVisible" width="80%"
                    :before-close="() => modalVisible = false">
                    <el-image class="carousel-image" :src="backToTheFuture" :preview-src-list="[backToTheFuture]"
                        :initial-index="0" :preview-teleported="true" />
                    <span class="dialog-text">N'oublie pas de retourner dans le passé Marty !!!</span>
                    <template #footer>
                        <div class="dialog-button">
                            <el-button @click="() => modalVisible = false" round type="primary" plain>Fermer</el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>
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

.time-travel-card {
    margin: 12px;
}

.delorean-container {
    position: relative;
    margin-bottom: 24px;
}

.delorean {
    height: 24px;
    position: absolute;
}

.accessible-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.done-button {
    margin: 20px 20px 0px 20px;
}

.dialog-text {
    display: flex;
    font-size: 24px;
    text-align: center;
    word-break: break-word;
}

.dialog-button {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style>
.progress-text .el-progress-bar__innerText {
    color: #000 !important;
}
</style>