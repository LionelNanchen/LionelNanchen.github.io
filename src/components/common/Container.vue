<script lang="ts">
import { defineComponent } from "vue";
import { useRiddlesStore } from "@/stores";
import type { ElScrollbar } from "element-plus";
import moment from "moment";
import Header from "./Header.vue";
import RiddleSelect from "./RiddleSelect.vue";
import Branch from "../../assets/general/branch.png";
import Leaf from "../../assets/general/leaf.png";

interface Data {
    riddles: Riddle[] | undefined,
    currentRiddle: Riddle | undefined,
    accessible: boolean,
    password: string,
    interval: NodeJS.Timer | undefined,
    countdown: number,
    branch: string,
    leaf: string,
}

export default defineComponent({
    components: { Header, RiddleSelect },
    props: {
        welcome: { type: Boolean, required: false },
    },
    data() {
        const data: Data = {
            riddles: [],
            currentRiddle: undefined,
            accessible: false,
            password: '',
            interval: undefined,
            countdown: 0,
            branch: Branch,
            leaf: Leaf,
        };
        return data;
    },
    created() {
        // Read path
        const path = window.location.pathname.split('/')[1];
        const store = useRiddlesStore();
        this.riddles = store.riddles;
        this.currentRiddle = !this.welcome && this.riddles ? (this.riddles.find((r: Riddle) => r.id === path) ?? this.riddles[0]) : undefined;

        // Check riddle available time
        this.checkAccessibility();
        if (!this.accessible) this.interval = setInterval(this.checkAccessibility, 10000);
    },
    mounted() {
        // Scroll to riddle select
        const width = (this.$refs.innerRef as HTMLDivElement)?.clientWidth;
        const index = this.currentRiddle?.index ?? 1;
        if (index > 4) {
            const offset = width * (this.currentRiddle?.index ?? 1) / 7;
            (this.$refs.scrollbarRef as InstanceType<typeof ElScrollbar>)?.setScrollLeft(offset);
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
        checkAccessibility() {
            if (this.currentRiddle) {
                const now = moment();
                const availableTime = moment(this.currentRiddle.availableTime, "YYYY-MM-DD HH:mm");
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
        },
    },
})
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main style="position: relative">
                <img :src="branch" class="branch" />
                <el-scrollbar ref="scrollbarRef" style="justify-content: center; display: flex;">
                    <div ref="innerRef" class="riddles">
                        <RiddleSelect v-for="riddle in riddles" :riddle="riddle" :currentRiddle="currentRiddle" />
                    </div>
                </el-scrollbar>
                <el-main element-loading-background="white">
                    <div v-if="welcome || accessible">
                        <div class="main" v-if="!welcome">
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
                    <div v-else>
                        <el-result icon="warning" title="Cet énigme n'est pas encore accessible"
                            :sub-title="inaccessibleMessage" />
                    </div>
                    <div class="leaf">
                        <img :src="leaf" />
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

.branch {
    position: absolute;
    width: 50%;
    max-width: 200px;
    top: 0px;
    right: 0px;
}

.leaf {
    margin: 40px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.leaf img {
    width: 100px;
}
</style>

<style>
.el-main {
    padding: 0px !important;
}

.common-layout {
    margin-bottom: 0px !important;
}
</style>