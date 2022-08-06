<script lang="ts">
import { defineComponent } from "vue";
import Container from "../components/common/Container.vue";
import { ForkSpoon } from '@element-plus/icons-vue';
import { Countdown } from 'vue3-flip-countdown'
import * as _ from "lodash";
import Kali from "../assets/cats/kali.jpeg";
import Kyubi from "../assets/cats/kyubi.jpeg";
import Clue1 from "../assets/cats/clues/1.jpeg";
import Clue2 from "../assets/cats/clues/2.jpeg";
import Clue3 from "../assets/cats/clues/3.jpeg";
import Clue4 from "../assets/cats/clues/4.jpeg";
import Clue5 from "../assets/cats/clues/5.jpeg";
import Clue6 from "../assets/cats/clues/6.jpeg";
import Clue7 from "../assets/cats/clues/7.jpeg";
import moment from "moment";

enum Result { NotSet, Wrong, Right }

interface Cat {
    name: string,
    image: string,
    drink: string,
    food: string,
    inputName?: string,
    options?: string[],
}

interface Data {
    Result: any,
    cats: Cat[],
    images: string[],
    drinks: string[],
    foods: string[],
    result: Result,
    remainingHearts: number,
    clues: string[],
    countdown: number,
    deadline: string | null,
    interval: any | null,
}

export default defineComponent({
    components: { Container, Countdown, ForkSpoon },
    data: () => {
        const data: Data = {
            Result,
            cats: [
                {
                    name: "kali",
                    image: Kali,
                    drink: "🫖",
                    food: "🍚",
                },
                {
                    name: "kyubi",
                    image: Kyubi,
                    drink: "💧",
                    food: "🦴",
                }
            ],
            images: [],
            drinks: ["🍷", "🥃", "🍺", "🥛", "☕️", "🍵", "🫖", "💧", "🍶"],
            foods: ["🍎", "🍉", "🍇", "🍚", "🍓", "🧀", "🦴", "🐠", "🐁"],
            remainingHearts: 3,
            result: Result.NotSet,
            clues: [Clue1, Clue2, Clue3, Clue4, Clue5, Clue6, Clue7],
            countdown: 0,
            deadline: null,
            interval: null,
        };
        return data;
    },
    created() {
        // Check remaining hearts
        const remainingHearts = localStorage.getItem('catsHearts');
        if (remainingHearts !== null) {
            this.remainingHearts = parseInt(remainingHearts);
            if (this.remainingHearts === 0) {
                const countdown = localStorage.getItem('catsCountdown') ?? "60";
                this.youDied(parseInt(countdown));
            }
        }
    },
    computed: {
        hearts() {
            return _.range(this.remainingHearts).map(() => " ❤️").join("");
        },
        groups() {
            return [
                {
                    label: "Boissons",
                    options: this.drinks,
                },
                {
                    label: "Nourritures",
                    options: this.foods,
                }
            ];
        },
    },
    methods: {
        checkCatsName() {
            return this.cats.reduce((acc, cat) => acc && cat.inputName?.toLocaleLowerCase() === cat.name.toLocaleLowerCase(), true)
        },
        checkButtonDisabled() {
            return !this.cats.reduce((acc, cat) => acc && !!cat.inputName && cat.options?.length === 2, true);
        },
        checkFoodAndDrink() {
            const result = this.cats.reduce((acc, cat) => acc && !!cat.options && cat.options.includes(cat.drink) && cat.options.includes(cat.food), true)
            if (result) {
                this.result = Result.Right;
            } else {
                this.result = Result.Wrong;
                this.remainingHearts = this.remainingHearts - 1;
                this.updateStorage();
                if (this.remainingHearts === 0) this.youDied(60);
            }
        },
        updateStorage() {
            localStorage.setItem('catsHearts', `${this.remainingHearts}`);
        },
        youDied(countdown: number) {
            // Clear interval
            if (this.interval) clearInterval(this.interval);
            this.interval = null;

            // Set countdown
            this.countdown = countdown;
            this.deadline = moment().add(this.countdown, 'seconds').format("YYYY-MM-DD HH:mm:ss");
            this.interval = setInterval(() => {
                this.countdown = this.countdown - 1;
                localStorage.setItem('catsCountdown', `${this.countdown}`);
                if (this.countdown <= 0) {
                    clearInterval(this.interval);
                    this.deadline = null;
                    this.refillHearts();
                }
            }, 1000);
        },
        refillHearts() {
            this.remainingHearts = 3;
            this.result = Result.NotSet;
            this.updateStorage();
        }
    },
});
</script>

<template>
    <Container>
        <div v-if="remainingHearts > 0">
            <el-card class="cats-card">
                <template #header>
                    <div class="card-header">
                        <span class="card-header-title">Nourris correctement les chats</span>
                        <span class="card-header-title">{{ hearts }}</span>
                    </div>

                </template>
                <div class="cats-card-body">
                    <div class="cats">
                        <div v-for="cat in cats" class="cat">
                            <img :src="cat.image" />
                            <el-input maxlength="10" type="text" v-model="cat.inputName" placeholder="Mon nom ?"
                                style="margin-top: 12px" />
                            <el-select v-if="checkCatsName()" v-model="cat.options" placeholder="Nourris moi !"
                                size="large" multiple :multiple-limit="2" style="margin: 12px 0px 12px 0px">
                                <el-option-group v-for="group in groups" :key="group.label" :label="group.label">
                                    <el-option v-for="option in group.options" :key="option" :label="option"
                                        :value="option" />
                                </el-option-group>
                            </el-select>
                        </div>
                    </div>
                    <el-button class="button" @click="checkFoodAndDrink()" type="primary" size="large"
                        :disabled="checkButtonDisabled()" round>
                        <el-icon>
                            <ForkSpoon />
                        </el-icon>
                        <span style="margin-right: 6px">À table</span>
                    </el-button>
                    <div style="margin-top: 12px">
                        <el-alert v-if="result === Result.Right" title="ㅈ + え" type="success" :closable="false"
                            effect="dark" show-icon />
                        <el-alert v-if="result === Result.Wrong" :title="`Plus que ${remainingHearts} ❤️`" type="error"
                            :closable="false" effect="dark" show-icon />
                    </div>
                </div>
            </el-card>
            <el-card class="cats-card">
                <template #header>
                    <span class="card-header-title">Que souaitent-ils?</span>
                </template>
                <el-carousel arrow="always" :autoplay="false" indicator-position="none" height="300px">
                    <el-carousel-item v-for="clue in clues" :key="clue">
                        <el-image class="carousel-image" :src="clue" :preview-src-list="clues" :initial-index="0"
                            :preview-teleported="true" />
                    </el-carousel-item>
                </el-carousel>
            </el-card>
        </div>
        <div v-else>
            <el-card class="cats-card">
                <template #header>
                    <span class="card-header-title">Plus aucune vie</span>
                </template>
                <el-result icon="error" title="❤️❤️❤️">
                    <template #extra>
                        <Countdown :deadline="deadline" :showDays="false" :showHours="false" :showMinutes="false"
                            mainColor="#b88230" mainFlipBackgroundColor="#f8e3c5" secondFlipBackgroundColor="#f3d19e"
                            labelColor="#2C3E50" />
                    </template>
                </el-result>
            </el-card>
        </div>
    </Container>
</template>

<style scoped>
.cats-card {
    margin: 12px;
}


.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-header-title {
    font-weight: bold;
}

.cats-card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cats {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cat {
    width: 45%;
}

.cat img {
    width: 100%;
    border-radius: 12px;
}

.button {
    margin-top: 12px;
}

.carousel-image {
    width: 100%;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style>
.el-select-dropdown__item {
    font-size: 24px !important;
    text-align: center;
}

.el-carousel__arrow {
    background-color: gray !important;
}

.el-image__inner {
    width: auto !important;
    max-width: 100%;
    max-height: 300px !important;
}

.el-alert__title {
    font-size: 18px !important;
}
</style>