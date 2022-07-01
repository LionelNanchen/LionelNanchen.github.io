<script lang="ts">
import { useRiddlesStore } from "@/stores";
import type { ElScrollbar } from "element-plus";
import { defineComponent } from "vue";
import moment from "moment";
import Header from "./Header.vue";
import RiddleSelect from "./RiddleSelect.vue";
import TimeAPI from "../../network/time";

interface Data {
    loading: boolean,
    riddles: Riddle[] | undefined,
    currentRiddle: Riddle | undefined,
    accessible: boolean,
    interval: NodeJS.Timer | undefined,
    countdown: number,
}

export default defineComponent({
    components: { Header, RiddleSelect },
    data() {
        const data: Data = {
            loading: true,
            riddles: [],
            currentRiddle: undefined,
            accessible: false,
            interval: undefined,
            countdown: 0,
        };
        return data;
    },
    created() {
        // TODO: Handle Welcome page
        // Read path
        const path = window.location.pathname.split('/')[1];
        const store = useRiddlesStore();
        this.riddles = store.riddles;
        this.currentRiddle = this.riddles?.find((r: Riddle) => r.id === path);

        // Check riddle available time
        this.checkAccessibility().then(() => {
            this.loading = false;
            if (!this.accessible) this.interval = setInterval(this.checkAccessibility, 10000);
        });
    },
    mounted() {
        // Scroll to riddle select
        const width = (this.$refs.innerRef as HTMLDivElement).clientWidth;
        const index = this.currentRiddle?.index ?? 1;
        if (index > 4) {
            const offset = width * (this.currentRiddle?.index ?? 1) / 7;
            (this.$refs.scrollbarRef as InstanceType<typeof ElScrollbar>).setScrollLeft(offset);
        }
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
        async checkAccessibility() {
            if (this.currentRiddle) {
                const now = await TimeAPI.now();
                const tmp = moment(this.currentRiddle.availableTime, "HH:mm");
                const availableTime = moment(now);
                availableTime.hours(tmp.hours());
                availableTime.minutes(tmp.minutes());
                this.countdown = availableTime.diff(now, "seconds");
                if (this.countdown <= 0) {
                    this.accessible = true;
                    this.clearInterval();
                }
            }
        },
        onChangeResponse(response: string) {
            if (this.currentRiddle) localStorage.setItem(this.currentRiddle?.id, response);
        },
    },
    computed: {
        inaccessibleMessage(): string {
            const minutes = Math.ceil(this.countdown / 60)
            return `Revenez dans ${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
    }
})
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <el-scrollbar ref="scrollbarRef">
                    <div ref="innerRef" class="riddles">
                        <RiddleSelect v-for="riddle in riddles" :riddle="riddle" :currentRiddle="currentRiddle" />
                    </div>
                </el-scrollbar>
                <el-main v-loading="loading" element-loading-background="white">
                    <div v-if="accessible">
                        <div class="main">
                            <span class="riddle-index">Énigme {{ currentRiddle?.index }} - </span>
                            <span class="title">{{ currentRiddle?.title }}</span>
                            <div class="input-response">
                                <el-input v-if="currentRiddle" maxlength="1" show-word-limit type="text"
                                    placeholder="Réponse" :value="currentRiddle?.response"
                                    v-model="currentRiddle.response" @change="onChangeResponse" />
                            </div>
                        </div>
                        <slot />
                    </div>
                    <div v-else-if="!loading">
                        <el-result icon="warning" title="Cet énigme n'est pas encore accessible"
                            :sub-title="inaccessibleMessage" />
                    </div>
                </el-main>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout {
    margin-bottom: 50px;
}

.main {
    margin: 12px;
}

.riddles {
    display: flex;
}

.riddle-index {
    font-size: 20px;
}

.title {
    font-size: 18px;
    font-weight: bold;
}

.input-response {
    margin-top: 6px;
    max-width: 140px;
}
</style>

<style>
.el-main {
    padding: 0px !important;
}
</style>